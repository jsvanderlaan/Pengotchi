import { AssetLoader } from '../assets/asset-loader';
import { Asset, FileType } from '../assets/asset.types';
import { EventManager } from '../events/event-manager';
import { Events } from '../events/events';
import { GameObject } from '../game-objects/game-object';
import { Step } from '../loop/loop.types';

export class Scene {
    private readonly _gameObjects: GameObject[]; // todo game object mananger? die kan dingen regelen als sorting en misschien iets van een factory bevatten voor simpel toevoegen.

    constructor(
        public readonly name: string,
        private readonly _events: EventManager,
        private readonly _update: Step,
        assets: Asset[],
        gameObjects: GameObject[]
    ) {
        this._gameObjects = gameObjects;
        const animations = assets.filter(asset => asset.fileType === FileType.animation);
        const otherAssets = assets.filter(asset => asset.fileType !== FileType.animation);
        this.loadAssets(otherAssets, () =>
            this.loadAssets(animations, () => this._events.emit(Events.scene_booted, this))
        );
    }

    loadAssets(assets: Asset[], callback: () => void): void {
        new AssetLoader(assets).load(callback);
    }

    add(obj: GameObject): Scene {
        this._gameObjects.push(obj);
        return this;
    }

    update(time: DOMHighResTimeStamp, delta: number): void {
        this._update(time, delta);
        this._gameObjects.forEach(obj => {
            return obj.update && obj.update(time, delta);
        });
    }

    render(ctx: CanvasRenderingContext2D): void {
        this._gameObjects.forEach(obj => obj.render && obj.render(ctx));
    }
}
