export class UniqueQueue<T> {
    private _queue: T[] = [];

    get length(): number {
        return this._queue.length;
    }

    constructor(private readonly _id: (item: T) => string) {}

    add(...items: T[]): UniqueQueue<T> {
        items.forEach(item => {
            if (this._queue.find(x => this._id(x) === this._id(item))) {
                return;
            }
            this._queue.push(item);
        });

        return this;
    }

    pop(): T {
        if (this._queue.length === 0) {
            throw new Error('Cannot pop empty queue');
        }

        return this._queue.splice(0, 1)[0];
    }
}
