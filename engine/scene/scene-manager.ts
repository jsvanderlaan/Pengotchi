import { Scene } from './scene';

export class SceneManager {
    private readonly _scenes: Record<string, Scene> = {};
    private _currentScene: Scene;

    get scene(): Scene {
        return this._currentScene;
    }

    constructor(scenes: Scene[]) {
        if (scenes.length < 1) {
            throw Error('Every game should at least contain one scene.');
        }

        scenes.forEach(scene => {
            if (this._scenes[scene.name] !== undefined) {
                throw new Error(`Scene ${scene.name} already exists`);
            }

            this._scenes[scene.name] = scene;
        });

        this._currentScene = scenes[0];
    }
}
