import { UniqueQueue } from '../common/datastructures/unique-queue';
import { Asset } from './asset.types';

export class AssetLoader {
    private _loading: boolean = false;
    private readonly _concurrentAmount: number = 10;

    private _queue: UniqueQueue<Asset> = new UniqueQueue(file => file.key);
    private _inflight: Set<Asset> = new Set<Asset>();

    constructor(files: Asset[]) {
        this._queue.add(...files);
    }

    load(callback: () => void): void {
        if (this._loading) {
            return;
        }

        if (this._queue.length === 0) {
            this._complete(callback);
            return;
        }

        const loading = [...Array(this._concurrentAmount)].map(() => this._loadNext());
        Promise.all(loading).then(() => this._complete(callback));
    }

    private _complete(callback: () => void): void {
        callback();
        this._loading = false;
    }

    private async _loadNext(): Promise<void> {
        if (this._queue.length === 0) {
            return Promise.resolve();
        }

        if (this._inflight.size >= this._concurrentAmount) {
            return Promise.resolve();
        }

        const next = this._queue.pop();
        this._inflight.add(next);

        try {
            await next.load();
        } catch (e) {
            console.error(e);
        }

        this._inflight.delete(next);
        return await this._loadNext();
    }
}
