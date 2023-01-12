export declare class DenseGridMutableStore<T> {
    private data;
    private columnNameDict;
    private orderedColumnKeys;
    private DEFAULT_CELL_VALUE;
    constructor();
    clear(): void;
    /**
     * Specifies the order of the column keys. Must invoke this before invoking `set` to ensure
     * there is a key for each column.
     */
    setOrderedColumnKeys(orderedColumnKeys: string[]): void;
    addColumn(columnKey: string): void;
    addColumnBefore(columnIndex: number): void;
    addColumnAfter(columnIndex: number): void;
    removeColumn(columnIndex: number): void;
    addRow(): void;
    addRowBefore(rowIndex?: number): void;
    addRowAfter(rowIndex?: number): void;
    removeRow(rowIndex: number): void;
    reorderColumns(oldIndex: number, newIndex: number, length: number): void;
    reorderRows(oldIndex: number, newIndex: number, length: number): void;
    get(rowIndex: number, columnIndex: number): T;
    getColumnKey(columnIndex: number): string;
    getColumnName(columnIndex: number): T;
    set(rowIndex: number, columnIndex: number, value: T): void;
    setColumnName(columnIndex: number, value: T): void;
    private createRow;
}
