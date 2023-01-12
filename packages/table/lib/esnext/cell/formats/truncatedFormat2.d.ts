import * as React from "react";
import { ITruncatedFormatState, TruncatedFormatProps } from "./truncatedFormat";
export declare class TruncatedFormat2 extends React.PureComponent<TruncatedFormatProps, ITruncatedFormatState> {
    static displayName: string;
    static defaultProps: TruncatedFormatProps;
    state: ITruncatedFormatState;
    private contentDiv;
    private handleContentDivRef;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private renderPopover;
    private handlePopoverOpen;
    private handlePopoverClose;
    private shouldShowPopover;
    private setTruncationState;
}
