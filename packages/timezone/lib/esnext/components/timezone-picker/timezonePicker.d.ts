import * as React from "react";
import { AbstractPureComponent2, ButtonProps, InputGroupProps2, IPopoverProps, Props } from "@blueprintjs/core";
import { TimezoneDisplayFormat } from "./timezoneDisplayFormat";
export { TimezoneDisplayFormat };
export declare type TimezonePickerProps = ITimezonePickerProps;
/** @deprecated use TimezonePickerProps */
export interface ITimezonePickerProps extends Props {
    children?: React.ReactNode;
    /**
     * The currently selected timezone UTC identifier, e.g. "Pacific/Honolulu".
     *
     * @see https://www.iana.org/time-zones
     */
    value: string | undefined;
    /**
     * Callback invoked when the user selects a timezone.
     */
    onChange: (timezone: string) => void;
    /**
     * The date to use when formatting timezone offsets.
     * An offset date is necessary to account for DST, but typically the default value of `now` will be sufficient.
     *
     * @default now
     */
    date?: Date;
    /**
     * Whether this component is non-interactive.
     * This prop will be ignored if `children` is provided.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to show the local timezone at the top of the list of initial timezone suggestions.
     *
     * @default true
     */
    showLocalTimezone?: boolean;
    /**
     * Format to use when displaying the selected (or default) timezone within the target element.
     * This prop will be ignored if `children` is provided.
     *
     * @default TimezoneDisplayFormat.OFFSET
     */
    valueDisplayFormat?: TimezoneDisplayFormat;
    /**
     * Text to show when no timezone has been selected (`value === undefined`).
     * This prop will be ignored if `children` is provided.
     *
     * @default "Select timezone..."
     */
    placeholder?: string;
    /**
     * Props to spread to the target `Button`.
     * This prop will be ignored if `children` is provided.
     */
    buttonProps?: Partial<ButtonProps>;
    /**
     * Props to spread to the filter `InputGroup`.
     * All props are supported except `ref` (use `inputRef` instead).
     * If you want to control the filter input, you can pass `value` and `onChange` here
     * to override `Select`'s own behavior.
     */
    inputProps?: InputGroupProps2;
    /** Props to spread to `Popover`. Note that `content` cannot be changed. */
    popoverProps?: Partial<IPopoverProps>;
}
export interface ITimezonePickerState {
    query: string;
}
/** @deprecated use { TimezoneSelect } from "@blueprintjs/datetime2" */
export declare class TimezonePicker extends AbstractPureComponent2<TimezonePickerProps, ITimezonePickerState> {
    static displayName: string;
    static defaultProps: Partial<TimezonePickerProps>;
    private timezoneItems;
    private initialTimezoneItems;
    constructor(props: TimezonePickerProps, context?: any);
    render(): JSX.Element;
    componentDidUpdate(prevProps: TimezonePickerProps, prevState: ITimezonePickerState): void;
    protected validateProps(props: TimezonePickerProps & {
        children?: React.ReactNode;
    }): void;
    private renderButton;
    private filterItems;
    private renderItem;
    private handleItemSelect;
    private handleQueryChange;
}
