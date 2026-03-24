/**
 * @moltstream/kick-chat
 * Kick.com chat client via Pusher WebSocket
 *
 * Connects to a Kick channel's chatroom and emits messages.
 * Also supports sending messages (requires auth token).
 */

import WebSocket from 'ws';
import { EventEmitter } from 'events';

export interface KickChatMessage {
  id: string;
  chatroom_id: number;
  content: string;
  sender: {
    id: number;
    username: string;
    slug: string;
    color: string;
  };
  created_at: string;
  type: 'message' | 'reply' | 'system';
}

export interface KickChatConfig {
  /** Kick channel slug (username) */
  channel: string;
  /** Chatroom ID (if known — skip lookup) */
  chatroomId?: number;
  /** Auth token for sending messages (optional) */
  authToken?: string;
  /** Auto-reconnect on disconnect */
  reconnect?: boolean;
  /** Reconnect delay in ms */
  reconnectDelay?: number;
}

const PUSHER_WS = 'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false';
const KICK_API = 'https://kick.com/api/v2';

export class KickChat extends EventEmitter {
  private ws: WebSocket | null = null;
  private config: Required<KickChatConfig>;
  private chatroomId: number = 0;
  private connected = false;
  private shouldReconnect = true;

  constructor(config: KickChatConfig) {
    super();
    this.config = {
      channel: config.channel,
      chatroomId: config.chatroomId ?? 0,
      authToken: config.authToken ?? '',
      reconnect: config.reconnect ?? true,
      reconnectDelay: config.reconnectDelay ?? 3000,
    };
  }

  /** Connect to Kick chat */
  async connect(): Promise<void> {
    // Resolve chatroom ID if not provided
    if (!this.config.chatroomId) {
      this.chatroomId = await this.resolveChatroomId(this.config.channel);
    } else {
      this.chatroomId = this.config.chatroomId;
    }

    this.shouldReconnect = true;
    this.initWebSocket();
  }

  /** Disconnect from chat */
  disconnect(): void {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
  }

  /** Send a message to chat (requires authToken) */
  async sendMessage(content: string): Promise<boolean> {
    if (!this.config.authToken) {
      this.emit('error', new Error('Auth token required to send messages'));
      return false;
    }

    try {
      const { fetch } = await import('undici');
      const res = await fetch(`${KICK_API}/messages/send/${this.chatroomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.authToken}`,
        },
        body: JSON.stringify({ content, type: 'message' }),
      });
      return res.ok;
    } catch (err) {
      this.emit('error', err);
      return false;
    }
  }

  get isConnected(): boolean {
    return this.connected;
  }

  // --- Private ---

  private async resolveChatroomId(channel: string): Promise<number> {
    try {
      const { fetch } = await import('undici');
      const res = await fetch(`${KICK_API}/channels/${channel}`);
      if (!res.ok) throw new Error(`Channel not found: ${channel}`);
      const data = await res.json() as any;
      const id = data?.chatroom?.id;
      if (!id) throw new Error(`No chatroom found for channel: ${channel}`);
      this.emit('debug', `Resolved chatroom ID: ${id} for ${channel}`);
      return id;
    } catch (err) {
      this.emit('error', err);
      throw err;
    }
  }

  private initWebSocket(): void {
    this.ws = new WebSocket(PUSHER_WS);

    this.ws.on('open', () => {
      this.emit('debug', 'WebSocket connected to Pusher');
    });

    this.ws.on('message', (raw: Buffer) => {
      try {
        const msg = JSON.parse(raw.toString());
        this.handlePusherMessage(msg);
      } catch {
        // ignore non-JSON
      }
    });

    this.ws.on('close', () => {
      this.connected = false;
      this.emit('disconnected');

      if (this.shouldReconnect && this.config.reconnect) {
        this.emit('debug', `Reconnecting in ${this.config.reconnectDelay}ms...`);
        setTimeout(() => this.initWebSocket(), this.config.reconnectDelay);
      }
    });

    this.ws.on('error', (err: Error) => {
      this.emit('error', err);
    });
  }

  private handlePusherMessage(msg: any): void {
    const event = msg.event;

    if (event === 'pusher:connection_established') {
      // Subscribe to chatroom channel
      this.subscribeToChatroom();
      return;
    }

    if (event === 'pusher_internal:subscription_succeeded') {
      this.connected = true;
      this.emit('connected', { chatroomId: this.chatroomId, channel: this.config.channel });
      return;
    }

    if (event === 'App\\Events\\ChatMessageEvent') {
      try {
        const data = JSON.parse(msg.data);
        const chatMsg: KickChatMessage = {
          id: data.id,
          chatroom_id: data.chatroom_id,
          content: data.content,
          sender: {
            id: data.sender?.id ?? 0,
            username: data.sender?.username ?? 'unknown',
            slug: data.sender?.slug ?? '',
            color: data.sender?.identity?.color ?? '#ffffff',
          },
          created_at: data.created_at,
          type: 'message',
        };
        this.emit('message', chatMsg);
      } catch {
        // malformed message
      }
      return;
    }

    // Other events we might care about
    if (event === 'App\\Events\\ChatMessageDeletedEvent') {
      this.emit('messageDeleted', msg.data);
    }
  }

  private subscribeToChatroom(): void {
    if (!this.ws) return;
    const subscribeMsg = JSON.stringify({
      event: 'pusher:subscribe',
      data: { auth: '', channel: `chatrooms.${this.chatroomId}.v2` },
    });
    this.ws.send(subscribeMsg);
    this.emit('debug', `Subscribing to chatrooms.${this.chatroomId}.v2`);
  }
}

export default KickChat;
