import { EventHandlers, Events } from './events';

export type Handler<K extends Events> = (
    ...args: Parameters<EventHandlers[K]>
) => ReturnType<EventHandlers[K]>;
