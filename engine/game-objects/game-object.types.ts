export type BaseObject = new (...args: any[]) => {};
export type GBaseObject<T = {}> = new (...args: any[]) => T;
