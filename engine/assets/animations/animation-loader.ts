import { CacheManager } from '../../cache/cache-manager';
import { AssetLoader } from '../asset-loader';
import { Asset, FileType } from '../asset.types';
import { ImageAsset } from '../image/image-asset';
import { Animation } from './animation.types';

export class AnimationAsset implements Asset {
    public readonly fileType = FileType.animation;

    constructor(
        public key: string,
        private readonly _animation: Animation,
        private readonly _cache: CacheManager
    ) {}

    async load(): Promise<void> {
        if (this._cache.animation.has(this.key)) {
            return;
        }

        return new Promise((resolve, _) => {
            const img = this._cache.image.get(this._animation.imgKey);
            let index = 0;
            let x = 0;
            let y = 0;
            let frames: ImageAsset[] = [];

            const width = this._animation.width;
            const height = this._animation.height;

            const canvas = document.createElement('canvas'); // todo get from pool and release to pool
            const ctx = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;

            while (y <= img.height - height) {
                while (x <= img.width - width) {
                    if (!this._animation.frames.includes(index)) {
                        x += width;
                        index++;
                        continue;
                    }
                    ctx?.clearRect(0, 0, width, height);
                    ctx?.drawImage(img, x, y, width, height, 0, 0, width, height);

                    const src = canvas.toDataURL();

                    frames.push(new ImageAsset(`${this.key}_${index}`, src, this._cache.image));

                    x += width;
                    index++;
                }
                y += height;
                x = 0;
            }

            new AssetLoader(frames).load(() => {
                this._cache.animation.add(this.key, this._animation);
                resolve();
            });
        });
    }
}

// export class AnimationLoader {
//     private readonly _cache: CacheManager;

//     constructor() {
//         this._cache = CacheManager.instance();
//     }

//     load(animantion: Animation, callback: () => void): void {
//         const img = this._cache.image.get(animantion.key);
//         let index = 0;
//         let x = 0;
//         let y = 0;
//         let frames: ImageAsset[] = [];

//         const canvas = document.createElement('canvas'); // todo get from pool and release to pool
//         const ctx = canvas.getContext('2d');

//         while (y <= img.height - animantion.height) {
//             while (x <= img.width - animantion.width) {
//                 if (!animantion.frames.includes(index)) {
//                     x += animantion.width;
//                     index++;
//                     continue;
//                 }
//                 ctx?.clearRect(0, 0, animantion.width, animantion.height);
//                 ctx?.drawImage(
//                     img,
//                     x,
//                     y,
//                     animantion.width,
//                     animantion.height,
//                     0,
//                     0,
//                     animantion.width,
//                     animantion.height
//                 );

//                 const src = canvas.toDataURL();

//                 frames.push(new ImageAsset(`${animantion.key}_${index}`, src, this._cache.image));

//                 x += animantion.width;
//                 index++;
//             }
//             y += animantion.height;
//             x = 0;
//         }

//         new AssetLoader(frames).load(callback);
//     }
// }
