import { BaseObject } from '../game-object.types';

// todo hier klopt nog niks van
export function Boundable<TBase extends BaseObject>(Base: TBase) {
    return class Boundable extends Base {
        getBoundingBox(): number {
            return 0;
        }
    };
}
