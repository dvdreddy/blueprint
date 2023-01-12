import * as React from "react";
import { InputGroupProps2, Props } from "@blueprintjs/core";
import { DateFormatProps, DatePickerBaseProps, DatePickerShortcut } from "@blueprintjs/datetime";
import { Popover2Props } from "@blueprintjs/popover2";
export interface DateInput2Props extends DatePickerBaseProps, DateFormatProps, Props {
    /**
     * Allows the user to clear the selection by clicking the currently selected day.
     * Passed to `DatePicker` component.
     *
     * @default true
     */
    canClearSelection?: boolean;
    /**
     * Text for the reset button in the date picker action bar.
     * Passed to `DatePicker` component.
     *
     * @default "Clear"
     */
    clearButtonText?: string;
    /**
     * Whether the calendar popover should close when a date is selected.
     *
     * @default true
     */
    closeOnSelection?: boolean;
    /** The default timezone selected. Defaults to the user local timezone */
    defaultTimezone?: string;
    /**
     * Whether to disable the timezone select.
     *
     * @default false
     */
    disableTimezoneSelect?: boolean;
    /**
     * The default date to be used in the component when uncontrolled, represented as an ISO string.
     */
    defaultValue?: string;
    /**
     * Whether the date input is non-interactive.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the component should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Props to pass to the [input group](#core/components/text-inputs.input-group).
     * `disabled` and `value` will be ignored in favor of the top-level props on this component.
     * `type` is fixed to "text".
     */
    inputProps?: Omit<InputGroupProps2, "disabled" | "type" | "value">;
    /**
     * Callback invoked whenever the date or timezone has changed.
     *
     * @param newDate ISO string or `null` (if the date is invalid or text input has been cleared)
     * @param isUserChange `true` if the user clicked on a date in the calendar, changed the input value,
     *     or cleared the selection; `false` if the date was changed by changing the month or year.
     */
    onChange?: (newDate: string | null, isUserChange: boolean) => void;
    /**
     * Called when the user finishes typing in a new date and the date causes an error state.
     * If the date is invalid, `new Date(undefined)` will be returned. If the date is out of range,
     * the out of range date will be returned (`onChange` is not called in this case).
     */
    onError?: (errorDate: Date) => void;
    /**
     * The props to pass to the popover.
     */
    popoverProps?: Partial<Omit<Popover2Props, "autoFocus" | "content" | "defaultIsOpen" | "disabled" | "enforceFocus" | "fill" | "renderTarget" | "targetTagName">>;
    /**
     * Element to render on right side of input.
     */
    rightElement?: JSX.Element;
    /**
     * Whether the bottom bar displaying "Today" and "Clear" buttons should be shown below the calendar.
     *
     * @default false
     */
    showActionsBar?: boolean;
    /**
     * Whether to show the timezone select dropdown on the right side of the input.
     * If `timePrecision` is undefined, this will always be false.
     *
     * @default false
     */
    showTimezoneSelect?: boolean;
    /**
     * Whether shortcuts to quickly select a date are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array is provided, the custom shortcuts will be displayed.
     *
     * @default false
     */
    shortcuts?: boolean | DatePickerShortcut[];
    /**
     * Text for the today button in the date picker action bar.
     * Passed to `DatePicker` component.
     *
     * @default "Today"
     */
    todayButtonText?: string;
    /** An ISO string representing the selected time. */
    value?: string | null;
}
export declare const DateInput2: React.FC<DateInput2Props>;
