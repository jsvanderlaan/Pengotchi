import { Step } from '../loop/loop.types';

export class GameObject {
    render?(ctx: CanvasRenderingContext2D): void;
    update?: Step;
}
