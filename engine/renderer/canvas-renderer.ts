import { GameConfig } from '../config/game-config';
import { DOMUtils } from '../dom/dom-utils';
import { Scene } from '../scene/scene';

export class CanvasRenderer {
    private readonly _canvas: HTMLCanvasElement;
    constructor(private readonly _config: GameConfig) {
        this._canvas = this._getCanvas();
    }

    render(scene: Scene): void {
        if (this._canvas === null) {
            return;
        }

        const ctx = this._canvas.getContext('2d')!;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this._config.width, this._config.height);

        scene.render(this._canvas);
    }

    private _getCanvas(): HTMLCanvasElement {
        const canvas = this._config.canvas ?? DOMUtils.createCanvas();
        canvas.width = this._config.width;
        canvas.height = this._config.height;
        return canvas;
    }
}
