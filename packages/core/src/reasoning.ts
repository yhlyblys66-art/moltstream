/**
 * Pluggable reasoning engine for agent decision-making.
 *
 * MoltStream doesn't ship an LLM — it provides the interface
 * for connecting any reasoning backend to stream decisions.
 */

export interface ReasoningEngine {
  /**
   * Given context, produce a decision.
   * Implementations can use LLMs, rule engines, ML models, or hybrids.
   */
  decide(context: ReasoningContext): Promise<ReasoningResult>;
}

export interface ReasoningContext {
  /** Current scene state */
  currentScene: string;
  /** Recent audience events */
  recentEvents: AudienceSignal[];
  /** Agent memory (compressed) */
  memory: MemorySnapshot;
  /** Custom context from the agent */
  custom?: Record<string, any>;
}

export interface AudienceSignal {
  type: 'chat' | 'donation' | 'follow' | 'subscription' | 'raid';
  user: string;
  data: Record<string, any>;
  timestamp: string;
  sentiment?: number; // -1 to 1
}

export interface MemorySnapshot {
  totalInteractions: number;
  topViewers: string[];
  sessionDuration: number;
  sceneHistory: string[];
}

export interface ReasoningResult {
  action: string;
  params: Record<string, any>;
  confidence: number;
  reasoning: string[];
  alternativesConsidered: Alternative[];
}

export interface Alternative {
  action: string;
  confidence: number;
  rejectedReason: string;
}

/**
 * Rule-based reasoning engine — no LLM required.
 * Good for deterministic agents or as a fallback.
 */
export class RuleEngine implements ReasoningEngine {
  private rules: Rule[] = [];

  addRule(rule: Rule): this {
    this.rules.push(rule);
    this.rules.sort((a, b) => b.priority - a.priority);
    return this;
  }

  async decide(context: ReasoningContext): Promise<ReasoningResult> {
    const start = performance.now();
    const alternatives: Alternative[] = [];

    for (const rule of this.rules) {
      const match = rule.condition(context);
      if (match) {
        return {
          action: rule.action,
          params: rule.params?.(context) ?? {},
          confidence: rule.confidence ?? 1.0,
          reasoning: [`Rule matched: ${rule.id}`, `Priority: ${rule.priority}`],
          alternativesConsidered: alternatives,
        };
      } else {
        alternatives.push({
          action: rule.action,
          confidence: rule.confidence ?? 0,
          rejectedReason: `Condition not met for rule: ${rule.id}`,
        });
      }
    }

    return {
      action: 'noop',
      params: {},
      confidence: 0,
      reasoning: ['No rules matched'],
      alternativesConsidered: alternatives,
    };
  }
}

export interface Rule {
  id: string;
  priority: number;
  condition: (ctx: ReasoningContext) => boolean;
  action: string;
  params?: (ctx: ReasoningContext) => Record<string, any>;
  confidence?: number;
}

/**
 * LLM-backed reasoning engine — connect to any LLM provider.
 * Produces structured decisions from natural language reasoning.
 */
export class LLMEngine implements ReasoningEngine {
  private endpoint: string;
  private apiKey: string;
  private model: string;
  private systemPrompt: string;

  constructor(config: { endpoint: string; apiKey: string; model: string; systemPrompt?: string }) {
    this.endpoint = config.endpoint;
    this.apiKey = config.apiKey;
    this.model = config.model;
    this.systemPrompt = config.systemPrompt ?? DEFAULT_SYSTEM_PROMPT;
  }

  async decide(context: ReasoningContext): Promise<ReasoningResult> {
    const prompt = this.buildPrompt(context);

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    const data = await response.json() as any;
    const parsed = JSON.parse(data.choices[0].message.content);

    return {
      action: parsed.action ?? 'noop',
      params: parsed.params ?? {},
      confidence: parsed.confidence ?? 0.5,
      reasoning: parsed.reasoning ?? [],
      alternativesConsidered: parsed.alternatives ?? [],
    };
  }

  private buildPrompt(context: ReasoningContext): string {
    return JSON.stringify({
      current_scene: context.currentScene,
      recent_events: context.recentEvents.slice(-10),
      memory: {
        total_interactions: context.memory.totalInteractions,
        session_duration_min: Math.round(context.memory.sessionDuration / 60),
        recent_scenes: context.memory.sceneHistory.slice(-5),
      },
    });
  }
}

const DEFAULT_SYSTEM_PROMPT = `You are a stream orchestration agent. Given the current scene state and recent audience events, decide the next action.

Respond with JSON:
{
  "action": "scene_transition" | "chat_send" | "audio_change" | "overlay_update" | "noop",
  "params": { ... },
  "confidence": 0.0-1.0,
  "reasoning": ["step 1", "step 2"],
  "alternatives": [{ "action": "...", "confidence": 0.0, "rejectedReason": "..." }]
}

Prioritize viewer engagement. Transition scenes when mood shifts. React to donations and raids immediately. Keep the stream dynamic but not chaotic.`;
