import { GameObject } from './game-object';

export class TextObject extends GameObject {
    private _text: string = '';

    setText(text: string): void {
        this._text = text;
    }

    override render(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        const randomColor = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
        context!.fillStyle = randomColor;
        context!.fillRect(100, 50, 200, 175);
        context!.fillText('FPS: ' + this._text, 10, 30);
        context?.fillRect;
    }
}
