import { CacheManager } from '../../cache/cache-manager';
import { ImageLoader } from '../image-loader';
import { File, FileType } from '../loader.types';

export class ImageFile implements File {
    public readonly fileType = FileType.image;
    constructor(public readonly key: string, private readonly _src: string, private readonly _cacheManager: CacheManager) {}
    async load() {
        const result = await ImageLoader.load(this._src);
        this._cacheManager.image.add(this.key, result);
    }
}
