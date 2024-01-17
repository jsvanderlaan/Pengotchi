import { CacheManager } from '../../cache/cache-manager';
import { GameObject } from '../game-object';
import { Positionable } from '../mixins/positionable';
import { Scalable } from '../mixins/scalable';

export class ImageObject extends Scalable(Positionable(GameObject)) {
    constructor(private readonly _imgKey: string) {
        super();
    }

    override render(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(CacheManager.instance().image.get(this._imgKey), this.x, this.y);
    }
}
