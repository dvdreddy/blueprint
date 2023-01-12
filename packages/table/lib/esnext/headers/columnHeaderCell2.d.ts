/// <reference types="react" />
import { AbstractPureComponent2 } from "@blueprintjs/core";
import { IColumnHeaderCellProps, IColumnHeaderCellState } from "./columnHeaderCell";
export interface ColumnHeaderCell2Props extends IColumnHeaderCellProps {
    /**
     * If `true`, adds an interaction bar on top of all column header cells, and
     * moves interaction triggers into it.
     *
     * @default false
     */
    enableColumnInteractionBar?: boolean;
}
export declare class ColumnHeaderCell2 extends AbstractPureComponent2<ColumnHeaderCell2Props, IColumnHeaderCellState> {
    static displayName: string;
    static defaultProps: ColumnHeaderCell2Props;
    /**
     * This method determines if a `MouseEvent` was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render fully interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    static isHeaderMouseTarget(target: HTMLElement): boolean;
    state: {
        isActive: boolean;
    };
    render(): JSX.Element;
    private renderName;
    private maybeRenderContent;
    private maybeRenderDropdownMenu;
    private handlePopoverOpened;
    private handlePopoverClosing;
}
