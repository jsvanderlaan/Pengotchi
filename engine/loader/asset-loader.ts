import { UniqueQueue } from '../common/datastructures/unique-queue';
import { File } from './loader.types';

export class AssetLoader {
    private readonly _concurrentAmount: number = 10;

    private _queue: UniqueQueue<File> = new UniqueQueue(file => file.key);
    private _inflight: Set<File> = new Set<File>();

    add(...files: File[]) {
        this._queue.add(...files);
    }

    async load(): Promise<void> {
        const inflightLength = this._inflight.size;

        if (this._queue.length === 0 && inflightLength === 0) {
            return Promise.resolve();
        }

        const loading = [...Array(this._concurrentAmount - inflightLength)].map(() => this._loadNext());
        await Promise.all(loading);
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
