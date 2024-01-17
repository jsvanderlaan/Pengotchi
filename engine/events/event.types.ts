import { EventHandlers, Events } from './events';

export type Handler<K extends Events> = (...args: Parameters<EventHandlers[K]>) => void;
export type Condition<K extends Events> = (...args: Parameters<EventHandlers[K]>) => boolean;
export type Callback<K extends Events> = { handler: Handler<K>; condition?: Condition<K> };
