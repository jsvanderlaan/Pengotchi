import { CacheManager } from '../cache/cache-manager';
import { AnimationAsset } from './animations/animation-loader';
import { Animation } from './animations/animation.types';
import { ImageAsset } from './image/image-asset';

export class AssetFactory {
    private static readonly _cacheManager: CacheManager = CacheManager.instance();

    static image(key: string, url: string): ImageAsset {
        return new ImageAsset(key, url, this._cacheManager.image);
    }

    static animation(key: string, animation: Animation): AnimationAsset {
        return new AnimationAsset(key, animation, this._cacheManager);
    }
}
