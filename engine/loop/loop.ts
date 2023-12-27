import { EventManager } from '../events/event-manager';
import { Events } from '../events/events';
import { Step } from './loop.types';

export class Loop {
    private _running: boolean = false;
    private _id: number = 0;
    private _frame: number = 0;
    private _startTime: number = 0;
    private _lastTime: number = 0;

    private _fps: number = 60;
    private _nextFpsUpdate: number = 0;
    private _framesThisSecond: number = 0;

    get fps(): number {
        return this._fps;
    }

    constructor(private _callback: Step, private readonly _events: EventManager) {}

    start(): void {
        if (this._running) {
            throw Error('RequestAnimationFrame can only run one loop at a time.');
        }

        this._startTime = window.performance.now();
        this._lastTime = this._startTime;
        this._running = true;

        this._id = window.requestAnimationFrame(this._step);
    }

    stop() {
        this._running = false;
        window.cancelAnimationFrame(this._id);
    }

    private _step = (time: DOMHighResTimeStamp) => {
        if (!this._running) {
            return;
        }

        var delta = Math.max(0, time - this._lastTime); // todo Smooth??

        if (time >= this._nextFpsUpdate) {
            this._updateFps(time);
        }

        this._callback(time, delta);

        this._lastTime = time;
        this._framesThisSecond++;
        this._frame++;

        this._id = window.requestAnimationFrame(this._step);
    };

    private _updateFps(time: DOMHighResTimeStamp) {
        this._fps = 0.6 * this._framesThisSecond + 0.4 * this._fps;
        this._events.emit(Events.fps_updated, this._fps);
        this._nextFpsUpdate = time + 1000;
        this._framesThisSecond = 0;
    }
}
