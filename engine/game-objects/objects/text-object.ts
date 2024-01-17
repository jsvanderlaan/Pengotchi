import { GameObject } from '../game-object';
import { Positionable } from '../mixins/positionable';

export class TextObject extends Positionable(GameObject) {
    private _text: string = '';

    setText(text: string): this {
        this._text = text;
        return this;
    }

    override render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#0099b0';
        ctx.fillText(this._text, this.x, this.y);
    }
}
