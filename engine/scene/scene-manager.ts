import { EventManager } from '../events/event-manager';
import { Events } from '../events/events';
import { Scene } from './scene';
import { SceneBuilder } from './scene-builder';

export class SceneManager {
    private readonly _bootedScenes: Record<string, Scene> = {};
    private _current: Scene | null = null;

    get current(): Scene | null {
        return this._current;
    }

    constructor(private readonly _events: EventManager) {}

    add(name: string, options: (sceneBuilder: SceneBuilder) => SceneBuilder): Scene {
        if (this._bootedScenes[name] !== undefined) {
            throw new Error(`Scene with name ${name} already exists`);
        }

        this._events.once(
            Events.scene_booted,
            scene => this._addLoadedScene(scene),
            scene => scene.name === name
        );
        return options(SceneBuilder.new(name, this._events)).build();
    }

    update(time: number, delta: number): void {
        this._current?.update(time, delta);
    }

    render(ctx: CanvasRenderingContext2D): void {
        this._current?.render(ctx);
    }

    private _addLoadedScene(scene: Scene): void {
        this._bootedScenes[scene.name] = scene;

        if (this._current === null) {
            this._current = scene;
        }
    }
}
