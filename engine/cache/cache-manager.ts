import { Cache } from './cache';

export class CacheManager {
    private readonly _imageCache = new Cache<HTMLImageElement>();

    get image(): Cache<HTMLImageElement> {
        return this._imageCache;
    }
}
