import { Animation } from '../assets/animations/animation.types';
import { Asset } from '../assets/asset.types';
import { EventManager } from '../events/event-manager';
import { GameObject } from '../game-objects/game-object';
import { Step } from '../loop/loop.types';
import { Scene } from './scene';

export class SceneBuilder {
    private _assets: Asset[] = [];
    private _animations: Animation[] = [];
    private _gameObjects: GameObject[] = [];
    private _update: Step = () => {};

    private constructor(private readonly _name: string, private readonly _events: EventManager) {}
    static new(name: string, events: EventManager): SceneBuilder {
        return new SceneBuilder(name, events);
    }

    gameObjects(...gameObjects: GameObject[]): SceneBuilder {
        this._gameObjects = this._gameObjects.concat(gameObjects);
        return this;
    }

    assets(...asset: Asset[]): SceneBuilder {
        this._assets = this._assets.concat(asset);
        return this;
    }

    update(update: Step): SceneBuilder {
        this._update = update;
        return this;
    }

    build(): Scene {
        return new Scene(this._name, this._events, this._update, this._assets, this._gameObjects);
    }
}
