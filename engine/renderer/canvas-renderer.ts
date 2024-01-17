import { GameConfig } from '../config/game-config';
import { DOMUtils } from '../dom/dom-utils';
import { SceneManager } from '../scene/scene-manager';

export class CanvasRenderer {
    private _canvas: HTMLCanvasElement | null = null;
    private _ctx: CanvasRenderingContext2D | null = null;

    constructor(private readonly _config: GameConfig) {}

    boot(): void {
        this._canvas = this._getCanvas();
        this._ctx = this._canvas.getContext('2d');
    }

    render(sceneManager: SceneManager): void {
        if (this._canvas === null || this._ctx === null) {
            return;
        }

        // todo setTransform to scale the game width and height to the canvas width and height. see https://stackoverflow.com/a/59619544

        this._ctx.fillStyle = 'black';
        this._ctx.fillRect(0, 0, this._config.width, this._config.height);

        this._ctx.imageSmoothingEnabled = false; // todo this will do great for pixelart, but not for other images

        sceneManager.render(this._ctx);
    }

    private _getCanvas(): HTMLCanvasElement {
        const canvas = this._config.canvas ?? DOMUtils.createCanvas();
        canvas.width = this._config.width; // todo now the game width is equal to the canvas width. This can be adjusted using setTransform https://stackoverflow.com/a/59619544
        canvas.height = this._config.height;
        return canvas;
    }
}
