export declare class SparseGridMutableStore<T> {
    private list;
    private map;
    constructor();
    clear(): void;
    set(i: number, j: number, value: T): void;
    unset(i: number, j: number): void;
    get(i: number, j: number): T;
    insertI(i: number, count: number): void;
    insertJ(j: number, count: number): void;
    deleteI(i: number, count: number): void;
    deleteJ(j: number, count: number): void;
    private add;
    private shift;
    private remove;
}
