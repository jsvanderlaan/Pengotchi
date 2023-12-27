import { BaseObject } from '../game-object.types';

// todo hier klopt nog niks van
export function Scalable<TBase extends BaseObject>(Base: TBase) {
    return class Scaling extends Base {
        private _scale = 1;

        setScale(scale: number) {
            this._scale = scale;
        }

        get scale(): number {
            return this._scale;
        }
    };
}
