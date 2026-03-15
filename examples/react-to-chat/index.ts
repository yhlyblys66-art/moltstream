/**
 * Reactive chat agent — demonstrates the Audience Loop Protocol.
 * Agent analyzes chat sentiment and adapts stream mood in real-time.
 *
 * Usage:
 *   npx tsx examples/react-to-chat/index.ts
 */

import { MoltAgent, SceneGraph, EventBus } from '@moltstream/core';
import { MockAdapter } from '@moltstream/adapters';
import { PolicyEngine } from '@moltstream/policy';
import { AuditLogger } from '@moltstream/audit';
import { ActionBridge } from '@moltstream/bridge';

// --- Scene setup ---
const scenes = new SceneGraph();
scenes.register({ id: 'chill', type: 'composite', layers: [
  { source: 'video://lofi-bg', position: { x: 0, y: 0 }, size: { width: 1920, height: 1080 }, zIndex: 0 },
  { source: 'overlay://chat-minimal', position: { x: 1520, y: 720 }, size: { width: 380, height: 340 }, zIndex: 5 },
]});
scenes.register({ id: 'hype', type: 'composite', layers: [
  { source: 'video://neon-bg', position: { x: 0, y: 0 }, size: { width: 1920, height: 1080 }, zIndex: 0 },
  { source: 'overlay://chat-full', position: { x: 1400, y: 100 }, size: { width: 500, height: 900 }, zIndex: 5 },
  { source: 'overlay://alerts', position: { x: 100, y: 100 }, size: { width: 400, height: 200 }, zIndex: 10 },
]});
scenes.register({ id: 'drama', type: 'composite', layers: [
  { source: 'video://dark-bg', position: { x: 0, y: 0 }, size: { width: 1920, height: 1080 }, zIndex: 0 },
  { source: 'overlay://spotlight', position: { x: 660, y: 290 }, size: { width: 600, height: 500 }, zIndex: 3 },
]});

// --- Sentiment analysis (simplified) ---
const HYPE_WORDS = ['hype', 'lets go', 'pog', 'omg', '🔥', 'insane', 'goat'];
const CHILL_WORDS = ['chill', 'relax', 'vibes', 'cozy', 'lofi', '😌'];
const DRAMA_WORDS = ['drama', 'fight', 'drama', 'beef', 'cancelled', 'exposed'];

function analyzeSentiment(message: string): 'hype' | 'chill' | 'drama' | 'neutral' {
  const lower = message.toLowerCase();
  if (HYPE_WORDS.some(w => lower.includes(w))) return 'hype';
  if (CHILL_WORDS.some(w => lower.includes(w))) return 'chill';
  if (DRAMA_WORDS.some(w => lower.includes(w))) return 'drama';
  return 'neutral';
}

// --- Agent setup ---
const bridge = new ActionBridge();
const audit = new AuditLogger({ storage: 'stdout', realTimeStream: true });

const agent = new MoltAgent({
  adapter: new MockAdapter(),
  policy: new PolicyEngine({
    preset: 'safe-mode',
    emergencyStop: { enabled: true, maxConsecutiveErrors: 5 },
  }),
  traces: true,
});

// Sliding window for sentiment tracking
const sentimentWindow: string[] = [];
const WINDOW_SIZE = 20;

agent.onAudienceEvent('chat', async (event, ctx) => {
  const sentiment = analyzeSentiment(event.data.message);
  
  // Track sentiment in sliding window
  sentimentWindow.push(sentiment);
  if (sentimentWindow.length > WINDOW_SIZE) sentimentWindow.shift();

  // Compute dominant sentiment
  const counts = { hype: 0, chill: 0, drama: 0, neutral: 0 };
  for (const s of sentimentWindow) counts[s as keyof typeof counts]++;
  
  const dominant = Object.entries(counts)
    .filter(([k]) => k !== 'neutral')
    .sort(([, a], [, b]) => b - a)[0];

  if (dominant && dominant[1] >= WINDOW_SIZE * 0.4) {
    const targetScene = dominant[0];
    if (targetScene !== ctx.sceneGraph.current()) {
      // Submit scene transition through the bridge
      bridge.submit({
        type: 'scene_transition',
        priority: dominant[1], // higher sentiment count = higher priority
        payload: { target: targetScene, transition: 'fade', duration: 800 },
        rollbackable: true,
      });

      ctx.sceneGraph.transition(targetScene, 'fade', 800);

      audit.log({
        timestamp: new Date().toISOString(),
        session_id: ctx.session.id,
        trigger: { type: 'chat', user: event.data.user, message: event.data.message },
        reasoning: {
          considered: ['hype', 'chill', 'drama'],
          selected: targetScene,
          confidence: dominant[1] / WINDOW_SIZE,
          latency_ms: 3,
        },
        action: { type: 'scene_transition', target: targetScene },
      });

      console.log(`\n  🎭 Mood shift: ${targetScene.toUpperCase()} (${dominant[1]}/${WINDOW_SIZE} messages)\n`);
    }
  }

  // Store in persistent memory
  ctx.memory.store({
    sessionId: ctx.session.id,
    type: 'audience',
    data: { user: event.data.user, message: event.data.message, sentiment },
  });
});

agent.on('started', () => {
  console.log('\n  🟢 Reactive chat agent started');
  console.log('  📊 Monitoring audience sentiment...');
  console.log('  📡 Scene transitions based on chat mood\n');
});

agent.start().catch(console.error);
