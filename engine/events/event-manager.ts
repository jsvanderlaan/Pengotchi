import { Handler } from './event.types';
import { EventHandlers, Events } from './events';

export class EventManager {
    private readonly _events: Partial<{ [K in Events]: Handler<K>[] }> = {};

    emit<K extends Events>(event: K, ...args: Parameters<EventHandlers[K]>) {
        this._events[event]?.forEach(handler => handler(...args));
    }

    on<K extends Events>(
        event: K,
        handler: (...args: Parameters<EventHandlers[K]>) => ReturnType<EventHandlers[K]>
    ): void {
        if (this._events[event] === undefined) {
            this._events[event] = [];
        }
        this._events[event]?.push(handler);
    }

    off<K extends Events>(
        event: K,
        handler: (...args: Parameters<EventHandlers[K]>) => ReturnType<EventHandlers[K]>
    ): void {
        this._events[event]?.filter(h => h !== handler);
    }
}
