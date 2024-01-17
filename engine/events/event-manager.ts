import { Callback, Condition, Handler } from './event.types';
import { EventHandlers, Events } from './events';

export class EventManager {
    private _events: Partial<{
        [K in Events]: Callback<K>[];
    }> = {};

    emit<K extends Events>(event: K, ...args: Parameters<EventHandlers[K]>) {
        this._events[event]
            ?.filter(({ condition }) => (condition ? condition(...args) : true))
            .forEach(({ handler }) => handler(...args));
    }

    on<K extends Events>(event: K, handler: Handler<K>, condition?: Condition<K>): void {
        if (this._events[event] === undefined) {
            this._events[event] = [];
        }
        this._events[event]?.push({ handler, condition });
    }

    once<K extends Events>(event: K, handler: Handler<K>, condition?: Condition<K>): void {
        const onceHandler = (...args: Parameters<EventHandlers[K]>): void => {
            this.off(event, onceHandler, condition);
            handler(...args);
        };
        this.on(event, onceHandler, condition);
    }

    off<K extends Events>(event: K, handler: Handler<K>, condition?: Condition<K>): void {
        const e = this._events[event];
        if (e === undefined) {
            return;
        }

        this._events[event] = e.filter(
            ({ handler: h, condition: c }) => h !== handler || c !== condition
        ) as Partial<{
            [K in Events]: Callback<K>[];
        }>[K]; // This "as" is hacky, but it does not get the right type "Callback<K>[]" for some reason..
    }
}
