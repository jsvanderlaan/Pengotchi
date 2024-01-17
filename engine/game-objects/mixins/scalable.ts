import { BaseObject } from '../game-object.types';

export function Scalable<TBase extends BaseObject>(Base: TBase) {
    return class Scaling extends Base {
        private _scale = 1;

        get scale(): number {
            return this._scale;
        }

        setScale(scale: number): this {
            this._scale = scale;
            return this;
        }
    };
}
