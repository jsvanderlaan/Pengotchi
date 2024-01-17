import { Animation } from '../../assets/animations/animation.types';
import { CacheManager } from '../../cache/cache-manager';
import { Step } from '../../loop/loop.types';
import { Positionable } from './positionable';

export function Animatable<TBase extends Positionable>(Base: TBase) {
    return class Animatable extends Base {
        private _startTimeAnimation: DOMHighResTimeStamp | null = null;
        private _currentAnimationKey: string | null = null;
        private _currentAnimation: Animation | null = null;
        private _currentFrame: number | null = null;
        private _img: HTMLImageElement | null = null;

        get img(): HTMLImageElement | null {
            return this._img;
        }

        play(key: string): this {
            this._currentAnimation = CacheManager.instance().animation.get(key);
            this._currentAnimationKey = key;
            return this;
        }

        stop(): void {
            this._startTimeAnimation = null;
            this._currentAnimationKey = null;
            this._currentAnimation = null;
            this._currentFrame = null;
            this._img = null;
        }

        update: Step = (time: DOMHighResTimeStamp, _: number): void => {
            if (!this._currentAnimation) {
                return;
            }

            if (!this._startTimeAnimation) {
                this._startTimeAnimation = time;
            }

            const timePassedSeconds = (time - this._startTimeAnimation) / 1000;
            const framesPassed = Math.floor(timePassedSeconds * this._currentAnimation.framerate);
            const nextFrame = framesPassed % this._currentAnimation.frames.length;

            if (nextFrame !== this._currentFrame) {
                this._currentFrame = nextFrame;
                this._img = CacheManager.instance().image.get(
                    `${this._currentAnimationKey}_${nextFrame}`
                );
            }
        };
    };
}
