export class Cache<T> {
    private readonly _cache: Record<string, T> = {};

    add(key: string, data: T): void {
        this._cache[key] = data;
    }

    has(key: string): boolean {
        return this._cache[key] !== undefined;
    }

    get(key: string): T {
        const cache = this._cache[key];
        if (cache === undefined) {
            throw new Error(`Cache with key ${key} does not exist.`);
        }
        return cache;
    }

    remove(key: string): void {
        delete this._cache[key];
    }
}
