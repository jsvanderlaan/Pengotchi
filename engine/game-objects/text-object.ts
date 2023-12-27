import { GameObject } from './game-object';

// todo render method slaat nergens op
export class TextObject extends GameObject {
    private _text: string = '';

    setText(text: string): void {
        this._text = text;
    }
    override render(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        const randomColor = '#0099b0';
        context!.fillStyle = randomColor;
        context!.fillRect(100, 50, 200, 175);
        context!.fillText('FPS: ' + this._text, 10, 30);
        context?.fillRect;
    }
}
