import { GameConfig } from '../config/game-config';
import { DOMUtils } from '../dom/dom-utils';
import { EventManager } from '../events/event-manager';
import { Loop } from '../loop/loop';
import { CanvasRenderer } from '../renderer/canvas-renderer';
import { SceneManager } from '../scene/scene-manager';

export class Game {
    readonly events: EventManager = new EventManager();
    private readonly _renderer: CanvasRenderer;
    readonly scenes: SceneManager = new SceneManager(this.events);

    private readonly _loop: Loop;

    constructor(readonly name: string, private readonly _config: GameConfig) {
        this._loop = new Loop((time, delta) => this._step(time, delta), this.events);
        this._renderer = new CanvasRenderer(this._config);

        DOMUtils.onContentLoaded(() => this._boot());
    }

    start(): void {
        this._loop.start();
    }

    stop(): void {
        this._loop.stop();
    }

    private _boot(): void {
        this._renderer.boot();
        this.start();
    }

    private _step(time: DOMHighResTimeStamp, delta: number): void {
        this.scenes.update(time, delta);

        this._renderer.render(this.scenes);
    }
}
