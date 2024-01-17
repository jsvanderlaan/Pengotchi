import { Cache } from '../../cache/cache';
import { Asset, FileType } from '../asset.types';
import { ImageLoader } from './image-loader';

export class ImageAsset implements Asset {
    public readonly fileType = FileType.image;

    constructor(
        public readonly key: string,
        private readonly _src: string,
        private readonly _cache: Cache<HTMLImageElement>
    ) {}

    async load() {
        if (this._cache.has(this.key)) {
            return;
        }

        const result = await ImageLoader.load(this._src);
        this._cache.add(this.key, result);
    }
}
