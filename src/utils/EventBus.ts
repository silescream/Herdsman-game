type Listener<T = any> = (payload?: T) => void;

export class EventBus {
  private listeners: Record<string, Listener[]> = {};

  on<T = any>(event: string, cb: Listener<T>) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb as Listener);
  }

  off<T = any>(event: string, cb: Listener<T>) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((fn) => fn !== cb);
  }

  emit<T = any>(event: string, payload?: T) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((cb) => cb(payload));
  }
}

export const eventBus = new EventBus();
