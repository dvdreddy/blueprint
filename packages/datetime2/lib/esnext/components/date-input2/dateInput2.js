/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import classNames from "classnames";
import * as React from "react";
import { DISPLAYNAME_PREFIX, InputGroup, mergeRefs, Tag, Utils, } from "@blueprintjs/core";
import { DatePicker, DatePickerUtils, } from "@blueprintjs/datetime";
import { Popover2 } from "@blueprintjs/popover2";
import * as Classes from "../../common/classes";
import { isDateValid, isDayInRange } from "../../common/dateUtils";
import { getCurrentTimezone } from "../../common/getTimezone";
import { getTimezoneShortName } from "../../common/timezoneNameUtils";
import { convertLocalDateToTimezoneTime, getDateObjectFromIsoString, getIsoEquivalentWithUpdatedTimezone, } from "../../common/timezoneUtils";
import { TimezoneSelect } from "../timezone-select/timezoneSelect";
const timezoneSelectButtonProps = {
    fill: false,
    minimal: true,
    outlined: true,
};
const INVALID_DATE = new Date(undefined);
const DEFAULT_MAX_DATE = DatePickerUtils.getDefaultMaxDate();
const DEFAULT_MIN_DATE = DatePickerUtils.getDefaultMinDate();
export const DateInput2 = React.memo(function _DateInput2(props) {
    const { defaultTimezone, defaultValue, disableTimezoneSelect, fill, inputProps = {}, 
    // defaults duplicated here for TypeScript convenience
    maxDate = DEFAULT_MAX_DATE, minDate = DEFAULT_MIN_DATE, placeholder, popoverProps = {}, showTimezoneSelect, timePrecision, value, ...datePickerProps } = props;
    // Refs
    // ------------------------------------------------------------------------
    const inputRef = React.useRef(null);
    const popoverContentRef = React.useRef(null);
    // State
    // ------------------------------------------------------------------------
    const [isOpen, setIsOpen] = React.useState(false);
    const [timezoneValue, setTimezoneValue] = React.useState(defaultTimezone ?? getCurrentTimezone());
    const valueFromProps = React.useMemo(() => getDateObjectFromIsoString(value, timezoneValue), [timezoneValue, value]);
    const isControlled = valueFromProps !== undefined;
    const defaultValueFromProps = React.useMemo(() => getDateObjectFromIsoString(defaultValue, timezoneValue), [defaultValue, defaultTimezone]);
    const [valueAsDate, setValue] = React.useState(isControlled ? valueFromProps : defaultValueFromProps);
    const [selectedShortcutIndex, setSelectedShortcutIndex] = React.useState(undefined);
    const [isInputFocused, setIsInputFocused] = React.useState(false);
    // rendered as the text input's value
    const formattedDateString = React.useMemo(() => {
        return valueAsDate === null ? undefined : DatePickerUtils.getFormattedDateString(valueAsDate, props);
    }, [
        valueAsDate,
        minDate,
        maxDate,
        // HACKHACK: ESLint false positive
        // eslint-disable-next-line @typescript-eslint/unbound-method
        props.formatDate,
        props.locale,
        props.invalidDateMessage,
        props.outOfRangeMessage,
    ]);
    const [inputValue, setInputValue] = React.useState(formattedDateString ?? undefined);
    const isErrorState = valueAsDate != null && (!isDateValid(valueAsDate) || !isDayInRange(valueAsDate, [minDate, maxDate]));
    // Effects
    // ------------------------------------------------------------------------
    React.useEffect(() => {
        if (isControlled) {
            setValue(valueFromProps);
        }
    }, [valueFromProps]);
    React.useEffect(() => {
        if (isControlled && !isInputFocused) {
            setInputValue(formattedDateString);
        }
    }, [formattedDateString]);
    // Popover contents (date picker)
    // ------------------------------------------------------------------------
    const handlePopoverClose = React.useCallback((e) => {
        popoverProps.onClose?.(e);
        setIsOpen(false);
    }, []);
    const handleDateChange = React.useCallback((newDate, isUserChange, didSubmitWithEnter = false) => {
        const prevDate = valueAsDate;
        if (newDate === null) {
            if (!isControlled && !didSubmitWithEnter) {
                // user clicked on current day in the calendar, so we should clear the input when uncontrolled
                setInputValue("");
            }
            props.onChange?.(null, isUserChange);
            return;
        }
        // this change handler was triggered by a change in month, day, or (if
        // enabled) time. for UX purposes, we want to close the popover only if
        // the user explicitly clicked a day within the current month.
        const newIsOpen = !isUserChange ||
            !props.closeOnSelection ||
            (prevDate != null &&
                (hasMonthChanged(prevDate, newDate) ||
                    (timePrecision !== undefined && hasTimeChanged(prevDate, newDate))));
        // if selecting a date via click or Tab, the input will already be
        // blurred by now, so sync isInputFocused to false. if selecting via
        // Enter, setting isInputFocused to false won't do anything by itself,
        // plus we want the field to retain focus anyway.
        // (note: spelling out the ternary explicitly reads more clearly.)
        const newIsInputFocused = didSubmitWithEnter ? true : false;
        if (isControlled) {
            setIsInputFocused(newIsInputFocused);
            setIsOpen(newIsOpen);
        }
        else {
            const newFormattedDateString = DatePickerUtils.getFormattedDateString(newDate, props);
            setIsInputFocused(newIsInputFocused);
            setIsOpen(newIsOpen);
            setValue(newDate);
            setInputValue(newFormattedDateString);
        }
        const newIsoDateString = getIsoEquivalentWithUpdatedTimezone(newDate, timezoneValue, timePrecision);
        props.onChange?.(newIsoDateString, isUserChange);
    }, [props.onChange, timezoneValue, timePrecision, valueAsDate]);
    const dayPickerProps = {
        ...props.dayPickerProps,
        onDayKeyDown: (day, modifiers, e) => {
            props.dayPickerProps?.onDayKeyDown?.(day, modifiers, e);
        },
        onMonthChange: (month) => {
            props.dayPickerProps?.onMonthChange?.(month);
        },
    };
    const handleShortcutChange = React.useCallback((_, index) => {
        setSelectedShortcutIndex(index);
    }, []);
    const handleStartFocusBoundaryFocusIn = React.useCallback((e) => {
        if (popoverContentRef.current?.contains(getRelatedTargetWithFallback(e))) {
            // Not closing Popover to allow user to freely switch between manually entering a date
            // string in the input and selecting one via the Popover
            inputRef.current?.focus();
        }
        else {
            getKeyboardFocusableElements(popoverContentRef).shift()?.focus();
        }
    }, []);
    const handleEndFocusBoundaryFocusIn = React.useCallback((e) => {
        if (popoverContentRef.current?.contains(getRelatedTargetWithFallback(e))) {
            inputRef.current?.focus();
            handlePopoverClose(e);
        }
        else {
            getKeyboardFocusableElements(popoverContentRef).pop()?.focus();
        }
    }, []);
    // React's onFocus prop listens to the focusin browser event under the hood, so it's safe to
    // provide it the focusIn event handlers instead of using a ref and manually adding the
    // event listeners ourselves.
    const popoverContent = (React.createElement("div", { ref: popoverContentRef },
        React.createElement("div", { onFocus: handleStartFocusBoundaryFocusIn, tabIndex: 0 }),
        React.createElement(DatePicker, { ...datePickerProps, dayPickerProps: dayPickerProps, maxDate: maxDate, minDate: minDate, onChange: handleDateChange, onShortcutChange: handleShortcutChange, selectedShortcutIndex: selectedShortcutIndex, timePrecision: timePrecision, 
            // the rest of this component handles invalid dates gracefully (to show error messages),
            // but DatePicker does not, so we must take care to filter those out
            value: isErrorState ? null : valueAsDate }),
        React.createElement("div", { onFocus: handleEndFocusBoundaryFocusIn, tabIndex: 0 })));
    // Timezone select
    // ------------------------------------------------------------------------
    // we need a date which is guaranteed to be non-null here; if necessary,
    // we use today's date and shift it to the desired/current timezone
    const tzSelectDate = React.useMemo(() => valueAsDate != null && isDateValid(valueAsDate)
        ? valueAsDate
        : convertLocalDateToTimezoneTime(new Date(), timezoneValue), [timezoneValue, valueAsDate]);
    const isTimezoneSelectHidden = timePrecision === undefined || showTimezoneSelect === false;
    const isTimezoneSelectDisabled = props.disabled || disableTimezoneSelect;
    const handleTimezoneChange = React.useCallback((newTimezone) => {
        if (valueAsDate !== null) {
            setTimezoneValue(newTimezone);
            const newDateString = getIsoEquivalentWithUpdatedTimezone(valueAsDate, newTimezone, timePrecision);
            props.onChange?.(newDateString, true);
        }
    }, [props.onChange, valueAsDate, timePrecision]);
    const maybeTimezonePicker = isTimezoneSelectHidden ? undefined : (React.createElement(TimezoneSelect, { value: timezoneValue, onChange: handleTimezoneChange, date: tzSelectDate, disabled: isTimezoneSelectDisabled, className: Classes.DATE_INPUT_TIMEZONE_SELECT, buttonProps: timezoneSelectButtonProps },
        React.createElement(Tag, { rightIcon: isTimezoneSelectDisabled ? undefined : "caret-down", interactive: !isTimezoneSelectDisabled, minimal: true }, getTimezoneShortName(timezoneValue, tzSelectDate))));
    // Text input
    // ------------------------------------------------------------------------
    const parseDate = React.useCallback((dateString) => {
        if (dateString === props.outOfRangeMessage || dateString === props.invalidDateMessage) {
            return null;
        }
        const newDate = props.parseDate(dateString, props.locale);
        return newDate === false ? INVALID_DATE : newDate;
    }, 
    // HACKHACK: ESLint false positive
    // eslint-disable-next-line @typescript-eslint/unbound-method
    [props.outOfRangeMessage, props.invalidDateMessage, props.parseDate, props.locale]);
    const handleInputFocus = React.useCallback((e) => {
        setIsInputFocused(true);
        setIsOpen(true);
        setInputValue(formattedDateString);
        props.inputProps?.onFocus?.(e);
    }, [formattedDateString, props.inputProps?.onFocus]);
    const handleInputBlur = React.useCallback((e) => {
        if (inputValue == null || valueAsDate == null) {
            return;
        }
        const date = parseDate(inputValue);
        if (inputValue.length > 0 &&
            inputValue !== formattedDateString &&
            (!isDateValid(date) || !isDayInRange(date, [minDate, maxDate]))) {
            if (isControlled) {
                setIsInputFocused(false);
            }
            else {
                setIsInputFocused(false);
                setValue(date);
                setInputValue(undefined);
            }
            if (date === null) {
                props.onChange?.(null, true);
            }
            else {
                props.onError?.(date);
            }
        }
        else {
            if (inputValue.length === 0) {
                setIsInputFocused(false);
                setValue(null);
                setInputValue(undefined);
            }
            else {
                setIsInputFocused(false);
            }
        }
        props.inputProps?.onBlur?.(e);
    }, [
        parseDate,
        formattedDateString,
        inputValue,
        valueAsDate,
        minDate,
        maxDate,
        props.onChange,
        props.onError,
        props.inputProps?.onBlur,
    ]);
    const handleInputChange = React.useCallback((e) => {
        const valueString = e.target.value;
        const inputValueAsDate = parseDate(valueString);
        if (isDateValid(inputValueAsDate) && isDayInRange(inputValueAsDate, [minDate, maxDate])) {
            if (isControlled) {
                setInputValue(valueString);
            }
            else {
                setValue(inputValueAsDate);
                setInputValue(valueString);
            }
            const newIsoDateString = getIsoEquivalentWithUpdatedTimezone(inputValueAsDate, timezoneValue, timePrecision);
            props.onChange?.(newIsoDateString, true);
        }
        else {
            if (valueString.length === 0) {
                props.onChange?.(null, true);
            }
            setValue(inputValueAsDate);
            setInputValue(valueString);
        }
        props.inputProps?.onChange?.(e);
    }, [minDate, maxDate, timezoneValue, timePrecision, parseDate, props.onChange, props.inputProps?.onChange]);
    const handleInputClick = React.useCallback((e) => {
        // stop propagation to the Popover's internal handleTargetClick handler;
        // otherwise, the popover will flicker closed as soon as it opens.
        e.stopPropagation();
        props.inputProps?.onClick?.(e);
    }, [props.inputProps?.onClick]);
    const handleInputKeyDown = React.useCallback((e) => {
        if (e.key === "Tab" && e.shiftKey) {
            // close popover on SHIFT+TAB key press
            handlePopoverClose(e);
        }
        else if (e.key === "Tab" && isOpen) {
            getKeyboardFocusableElements(popoverContentRef).shift()?.focus();
            // necessary to prevent focusing the second focusable element
            e.preventDefault();
        }
        else if (e.key === "Escape") {
            setIsOpen(false);
            inputRef.current?.blur();
        }
        else if (e.key === "Enter" && inputValue != null) {
            const nextDate = parseDate(inputValue);
            if (isDateValid(nextDate)) {
                handleDateChange(nextDate, true, true);
            }
        }
        props.inputProps?.onKeyDown?.(e);
    }, [inputValue, parseDate, props.inputProps?.onKeyDown]);
    // Main render
    // ------------------------------------------------------------------------
    const shouldShowErrorStyling = !isInputFocused || inputValue === props.outOfRangeMessage || inputValue === props.invalidDateMessage;
    // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like the "fill" prop.
    const renderTarget = React.useCallback(
    // N.B. pull out `defaultValue` so that it's not forwarded to the DOM.
    ({ defaultValue: _defaultValue, isOpen: targetIsOpen, ref, ...targetProps }) => {
        return (React.createElement(InputGroup, { autoComplete: "off", className: classNames(targetProps.className, inputProps.className), intent: shouldShowErrorStyling && isErrorState ? "danger" : "none", placeholder: placeholder, rightElement: React.createElement(React.Fragment, null,
                maybeTimezonePicker,
                props.rightElement), type: "text", ...targetProps, ...inputProps, "aria-expanded": targetIsOpen, disabled: props.disabled, fill: fill, inputRef: mergeRefs(ref, inputRef, props.inputProps?.inputRef ?? null), onBlur: handleInputBlur, onChange: handleInputChange, onClick: handleInputClick, onFocus: handleInputFocus, onKeyDown: handleInputKeyDown, value: (isInputFocused ? inputValue : formattedDateString) ?? "" }));
    }, [
        fill,
        formattedDateString,
        inputValue,
        isInputFocused,
        isTimezoneSelectDisabled,
        isTimezoneSelectHidden,
        placeholder,
        shouldShowErrorStyling,
        props.disabled,
        props.inputProps,
        props.rightElement,
    ]);
    // N.B. no need to set `fill` since that is unused with the `renderTarget` API
    return (React.createElement(Popover2, { isOpen: isOpen && !props.disabled, ...popoverProps, autoFocus: false, className: classNames(Classes.DATE_INPUT, popoverProps.className, props.className), content: popoverContent, enforceFocus: false, onClose: handlePopoverClose, popoverClassName: classNames(Classes.DATE_INPUT_POPOVER, popoverProps.popoverClassName), renderTarget: renderTarget }));
});
DateInput2.displayName = `${DISPLAYNAME_PREFIX}.DateInput2`;
DateInput2.defaultProps = {
    closeOnSelection: true,
    disabled: false,
    invalidDateMessage: "Invalid date",
    maxDate: DEFAULT_MAX_DATE,
    minDate: DEFAULT_MIN_DATE,
    outOfRangeMessage: "Out of range",
    reverseMonthAndYearMenus: false,
};
function getRelatedTargetWithFallback(e) {
    return (e.relatedTarget ?? Utils.getActiveElement(e.currentTarget));
}
function getKeyboardFocusableElements(popoverContentRef) {
    if (popoverContentRef.current === null) {
        return [];
    }
    const elements = Array.from(popoverContentRef.current.querySelectorAll("button:not([disabled]),input,[tabindex]:not([tabindex='-1'])"));
    // Remove focus boundary div elements
    elements.pop();
    elements.shift();
    return elements;
}
function hasMonthChanged(prevDate, nextDate) {
    return (prevDate == null) !== (nextDate == null) || nextDate?.getMonth() !== prevDate?.getMonth();
}
function hasTimeChanged(prevDate, nextDate) {
    return ((prevDate == null) !== (nextDate == null) ||
        nextDate?.getHours() !== prevDate?.getHours() ||
        nextDate?.getMinutes() !== prevDate?.getMinutes() ||
        nextDate?.getSeconds() !== prevDate?.getSeconds() ||
        nextDate?.getMilliseconds() !== prevDate?.getMilliseconds());
}
//# sourceMappingURL=dateInput2.js.map