import { CacheManager } from '../cache/cache-manager';
import { GameConfig } from '../config/game-config';
import { EventManager } from '../events/event-manager';
import { AssetLoader } from '../loader/asset-loader';
import { Loop } from '../loop/loop';
import { CanvasRenderer } from '../renderer/canvas-renderer';
import { SceneManager } from '../scene/scene-manager';

export class Game {
    readonly events: EventManager = new EventManager();
    private _loop: Loop | null = null; // todo make private

    constructor(
        readonly name: string,
        private readonly _config: GameConfig,
        private readonly _renderer: CanvasRenderer,
        private readonly _cacheManager: CacheManager,
        private readonly _assestLoader: AssetLoader,
        private readonly _sceneManager: SceneManager
    ) {}

    start(): void {
        if (this._loop === null) {
            this._loop = new Loop(this._step, this.events);
        }

        this._loop?.start();
    }

    stop(): void {
        this._loop?.stop();
    }

    private _step = (time: DOMHighResTimeStamp, delta: number): void => {
        this._sceneManager.scene.update(time, delta);

        this._renderer.render(this._sceneManager.scene);
    };
}
