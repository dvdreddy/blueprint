import * as React from "react";
import { Region, RegionCardinality, RenderMode, TruncatedPopoverMode } from "@blueprintjs/table";
export declare enum FocusStyle {
    TAB = "tab",
    TAB_OR_CLICK = "tab-or-click"
}
export declare enum CellContent {
    EMPTY = "empty",
    CELL_NAMES = "cell-names",
    LONG_TEXT = "long-text",
    LARGE_JSON = "large-json"
}
export declare enum SelectedRegionTransformPreset {
    CELL = "cell",
    ROW = "row",
    COLUMN = "column"
}
export interface IMutableTableState {
    cellContent?: CellContent;
    cellTruncatedPopoverMode?: TruncatedPopoverMode;
    cellTruncationLength?: number;
    enableCellEditing?: boolean;
    enableCellSelection?: boolean;
    enableCellTruncation?: boolean;
    enableCellTruncationFixed?: boolean;
    enableCellWrap?: boolean;
    enableColumnCustomHeaders?: boolean;
    enableColumnHeader?: boolean;
    enableColumnNameEditing?: boolean;
    enableColumnReordering?: boolean;
    enableColumnResizing?: boolean;
    enableColumnSelection?: boolean;
    enableContextMenu?: boolean;
    enableFullTableSelection?: boolean;
    enableLayoutBoundary?: boolean;
    enableMultiSelection?: boolean;
    enableRowHeader?: boolean;
    enableRowReordering?: boolean;
    enableRowResizing?: boolean;
    enableRowSelection?: boolean;
    enableSlowLayout?: boolean;
    numCols?: number;
    numFrozenCols?: number;
    numFrozenRows?: number;
    numRows?: number;
    renderMode?: RenderMode;
    scrollToColumnIndex?: number;
    scrollToRegionType?: RegionCardinality;
    scrollToRowIndex?: number;
    selectedFocusStyle?: FocusStyle;
    selectedRegionTransformPreset?: SelectedRegionTransformPreset;
    selectedRegions?: Region[];
    showCallbackLogs?: boolean;
    showCellsLoading?: boolean;
    showColumnHeadersLoading?: boolean;
    showColumnMenus?: boolean;
    showCustomRegions?: boolean;
    showFocusCell?: boolean;
    showGhostCells?: boolean;
    showInline?: boolean;
    showRowHeadersLoading?: boolean;
    showTableInteractionBar?: boolean;
    showZebraStriping?: boolean;
}
export declare class MutableTable extends React.Component<{}, IMutableTableState> {
    private store;
    private tableInstance;
    private stateStore;
    private refHandlers;
    constructor(props: {});
    render(): JSX.Element;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUpdate(_nextProps: {}, nextState: IMutableTableState): void;
    componentDidUpdate(): void;
    private generateColumnKey;
    private renderTable;
    private renderColumns;
    private renderColumnHeaderCell;
    private getColumnNameRenderer;
    private renderCustomColumnName;
    private renderEditableColumnName;
    private renderColumnMenu;
    private renderRowHeader;
    private renderRowMenu;
    private getCellValue;
    private renderCell;
    private renderSidebar;
    private renderButton;
    private renderScrollToSection;
    private renderSwitch;
    private renderNumberSelectMenu;
    private renderSelectMenu;
    private isPrereqStateKeySatisfied;
    private wrapDisabledControlWithTooltip;
    private onCompleteRender;
    private onSelection;
    private onColumnsReordered;
    private onRowsReordered;
    private onColumnWidthChanged;
    private onRowHeightChanged;
    private onFocus;
    private onCopy;
    private onVisibleCellsChange;
    private maybeLogCallback;
    private handleEditableBodyCellConfirm;
    private handleEditableColumnCellConfirm;
    private handleDefaultsButtonClick;
    private handleScrollToButtonClick;
    private handleResizeRowsByTallestCellButtonClick;
    private handleResizeRowsByApproxHeightButtonClick;
    private getCellText;
    private resetCellContent;
    private syncFocusStyle;
    private syncDependentBooleanStates;
    private handleBooleanStateChange;
    private handleNumberStateChange;
    private handleStringStateChange;
    private renderBodyContextMenu;
    private getEnabledSelectionModes;
    private getEnabledLoadingOptions;
    private getSelectedRegionTransform;
    private getStyledRegionGroups;
}
