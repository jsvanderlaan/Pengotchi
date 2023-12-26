import { GameObject } from '../game-objects/game-object';
import { Step } from '../loop/loop.types';

export class Scene {
    private readonly _gameObjects: GameObject[] = []; // todo game object mananger? die kan dingen regelen als sorting en misschien iets van een factory bevatten voor simpel toevoegen.

    constructor(public readonly name: string, public update: Step) {}

    add(obj: GameObject): Scene {
        this._gameObjects.push(obj);
        return this;
    }

    render(canvas: HTMLCanvasElement): void {
        this._gameObjects.forEach(obj => obj.render(canvas));
    }
}
