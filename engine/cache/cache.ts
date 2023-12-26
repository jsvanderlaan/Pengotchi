export class Cache<T> {
    private readonly _cache: Record<string, T> = {};

    add(key: string, data: T): void {
        console.log('cache added', key, data);
        this._cache[key] = data;
    }

    has(key: string): boolean {
        return this._cache[key] !== undefined;
    }

    get(key: string): T {
        return this._cache[key];
    }

    remove(key: string): void {
        delete this._cache[key];
    }
}
