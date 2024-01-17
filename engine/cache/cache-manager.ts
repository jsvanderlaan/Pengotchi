import { Animation } from '../assets/animations/animation.types';
import { Cache } from './cache';

export class CacheManager {
    private static _instance: CacheManager;
    private readonly _imageCache = new Cache<HTMLImageElement>();
    private readonly _animationCache = new Cache<Animation>();

    private constructor() {}
    static instance(): CacheManager {
        if (!this._instance) {
            this._instance = new CacheManager();
        }
        return this._instance;
    }

    get image(): Cache<HTMLImageElement> {
        return this._imageCache;
    }

    get animation(): Cache<Animation> {
        return this._animationCache;
    }
}
