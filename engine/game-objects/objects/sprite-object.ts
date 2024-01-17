import { GameObject } from '../game-object';
import { Animatable } from '../mixins/animatable';
import { Positionable } from '../mixins/positionable';
import { Scalable } from '../mixins/scalable';

export class SpriteObject extends Animatable(Positionable(Scalable(GameObject))) {
    render(ctx: CanvasRenderingContext2D): void {
        if (this.img) {
            ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.img.width * this.scale,
                this.img.height * this.scale
            );
        }
    }
}
