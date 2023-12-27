import { IRenderable } from './game-object.types';

export class GameObject implements IRenderable {
    render(_: HTMLCanvasElement): void {}
}
