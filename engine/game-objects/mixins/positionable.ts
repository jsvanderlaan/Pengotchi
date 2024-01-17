import { BaseObject, GBaseObject } from '../game-object.types';

export function Positionable<TBase extends BaseObject>(Base: TBase) {
    return class Positionable extends Base {
        x: number = 0;
        y: number = 0;

        setPosition(x: number, y: number): this {
            this.x = x;
            this.y = y;
            return this;
        }
    };
}

export type Positionable = GBaseObject<{ x: number; y: number }>;
