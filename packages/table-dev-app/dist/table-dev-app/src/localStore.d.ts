/**
 * Simple typed storage API for a JSON serializable object in web local storage
 * or session storage.
 */
export declare class LocalStore<T extends {}> {
    private key;
    private storage;
    constructor(key: string, session?: boolean);
    getWithDefaults(defaultValue?: T): T | {};
    get(): T | {};
    set(state: T): void;
    clear(): void;
}
