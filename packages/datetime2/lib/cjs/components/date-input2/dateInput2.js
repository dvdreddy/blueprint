"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInput2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var datetime_1 = require("@blueprintjs/datetime");
var popover2_1 = require("@blueprintjs/popover2");
var Classes = tslib_1.__importStar(require("../../common/classes"));
var dateUtils_1 = require("../../common/dateUtils");
var getTimezone_1 = require("../../common/getTimezone");
var timezoneNameUtils_1 = require("../../common/timezoneNameUtils");
var timezoneUtils_1 = require("../../common/timezoneUtils");
var timezoneSelect_1 = require("../timezone-select/timezoneSelect");
var timezoneSelectButtonProps = {
    fill: false,
    minimal: true,
    outlined: true,
};
var INVALID_DATE = new Date(undefined);
var DEFAULT_MAX_DATE = datetime_1.DatePickerUtils.getDefaultMaxDate();
var DEFAULT_MIN_DATE = datetime_1.DatePickerUtils.getDefaultMinDate();
exports.DateInput2 = React.memo(function _DateInput2(props) {
    var _a, _b, _c, _d, _e;
    var defaultTimezone = props.defaultTimezone, defaultValue = props.defaultValue, disableTimezoneSelect = props.disableTimezoneSelect, fill = props.fill, _f = props.inputProps, inputProps = _f === void 0 ? {} : _f, 
    // defaults duplicated here for TypeScript convenience
    _g = props.maxDate, 
    // defaults duplicated here for TypeScript convenience
    maxDate = _g === void 0 ? DEFAULT_MAX_DATE : _g, _h = props.minDate, minDate = _h === void 0 ? DEFAULT_MIN_DATE : _h, placeholder = props.placeholder, _j = props.popoverProps, popoverProps = _j === void 0 ? {} : _j, showTimezoneSelect = props.showTimezoneSelect, timePrecision = props.timePrecision, value = props.value, datePickerProps = tslib_1.__rest(props, ["defaultTimezone", "defaultValue", "disableTimezoneSelect", "fill", "inputProps", "maxDate", "minDate", "placeholder", "popoverProps", "showTimezoneSelect", "timePrecision", "value"]);
    // Refs
    // ------------------------------------------------------------------------
    var inputRef = React.useRef(null);
    var popoverContentRef = React.useRef(null);
    // State
    // ------------------------------------------------------------------------
    var _k = React.useState(false), isOpen = _k[0], setIsOpen = _k[1];
    var _l = React.useState(defaultTimezone !== null && defaultTimezone !== void 0 ? defaultTimezone : (0, getTimezone_1.getCurrentTimezone)()), timezoneValue = _l[0], setTimezoneValue = _l[1];
    var valueFromProps = React.useMemo(function () { return (0, timezoneUtils_1.getDateObjectFromIsoString)(value, timezoneValue); }, [timezoneValue, value]);
    var isControlled = valueFromProps !== undefined;
    var defaultValueFromProps = React.useMemo(function () { return (0, timezoneUtils_1.getDateObjectFromIsoString)(defaultValue, timezoneValue); }, [defaultValue, defaultTimezone]);
    var _m = React.useState(isControlled ? valueFromProps : defaultValueFromProps), valueAsDate = _m[0], setValue = _m[1];
    var _o = React.useState(undefined), selectedShortcutIndex = _o[0], setSelectedShortcutIndex = _o[1];
    var _p = React.useState(false), isInputFocused = _p[0], setIsInputFocused = _p[1];
    // rendered as the text input's value
    var formattedDateString = React.useMemo(function () {
        return valueAsDate === null ? undefined : datetime_1.DatePickerUtils.getFormattedDateString(valueAsDate, props);
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
    var _q = React.useState(formattedDateString !== null && formattedDateString !== void 0 ? formattedDateString : undefined), inputValue = _q[0], setInputValue = _q[1];
    var isErrorState = valueAsDate != null && (!(0, dateUtils_1.isDateValid)(valueAsDate) || !(0, dateUtils_1.isDayInRange)(valueAsDate, [minDate, maxDate]));
    // Effects
    // ------------------------------------------------------------------------
    React.useEffect(function () {
        if (isControlled) {
            setValue(valueFromProps);
        }
    }, [valueFromProps]);
    React.useEffect(function () {
        if (isControlled && !isInputFocused) {
            setInputValue(formattedDateString);
        }
    }, [formattedDateString]);
    // Popover contents (date picker)
    // ------------------------------------------------------------------------
    var handlePopoverClose = React.useCallback(function (e) {
        var _a;
        (_a = popoverProps.onClose) === null || _a === void 0 ? void 0 : _a.call(popoverProps, e);
        setIsOpen(false);
    }, []);
    var handleDateChange = React.useCallback(function (newDate, isUserChange, didSubmitWithEnter) {
        var _a, _b;
        if (didSubmitWithEnter === void 0) { didSubmitWithEnter = false; }
        var prevDate = valueAsDate;
        if (newDate === null) {
            if (!isControlled && !didSubmitWithEnter) {
                // user clicked on current day in the calendar, so we should clear the input when uncontrolled
                setInputValue("");
            }
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, null, isUserChange);
            return;
        }
        // this change handler was triggered by a change in month, day, or (if
        // enabled) time. for UX purposes, we want to close the popover only if
        // the user explicitly clicked a day within the current month.
        var newIsOpen = !isUserChange ||
            !props.closeOnSelection ||
            (prevDate != null &&
                (hasMonthChanged(prevDate, newDate) ||
                    (timePrecision !== undefined && hasTimeChanged(prevDate, newDate))));
        // if selecting a date via click or Tab, the input will already be
        // blurred by now, so sync isInputFocused to false. if selecting via
        // Enter, setting isInputFocused to false won't do anything by itself,
        // plus we want the field to retain focus anyway.
        // (note: spelling out the ternary explicitly reads more clearly.)
        var newIsInputFocused = didSubmitWithEnter ? true : false;
        if (isControlled) {
            setIsInputFocused(newIsInputFocused);
            setIsOpen(newIsOpen);
        }
        else {
            var newFormattedDateString = datetime_1.DatePickerUtils.getFormattedDateString(newDate, props);
            setIsInputFocused(newIsInputFocused);
            setIsOpen(newIsOpen);
            setValue(newDate);
            setInputValue(newFormattedDateString);
        }
        var newIsoDateString = (0, timezoneUtils_1.getIsoEquivalentWithUpdatedTimezone)(newDate, timezoneValue, timePrecision);
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, newIsoDateString, isUserChange);
    }, [props.onChange, timezoneValue, timePrecision, valueAsDate]);
    var dayPickerProps = tslib_1.__assign(tslib_1.__assign({}, props.dayPickerProps), { onDayKeyDown: function (day, modifiers, e) {
            var _a, _b;
            (_b = (_a = props.dayPickerProps) === null || _a === void 0 ? void 0 : _a.onDayKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, day, modifiers, e);
        }, onMonthChange: function (month) {
            var _a, _b;
            (_b = (_a = props.dayPickerProps) === null || _a === void 0 ? void 0 : _a.onMonthChange) === null || _b === void 0 ? void 0 : _b.call(_a, month);
        } });
    var handleShortcutChange = React.useCallback(function (_, index) {
        setSelectedShortcutIndex(index);
    }, []);
    var handleStartFocusBoundaryFocusIn = React.useCallback(function (e) {
        var _a, _b, _c;
        if ((_a = popoverContentRef.current) === null || _a === void 0 ? void 0 : _a.contains(getRelatedTargetWithFallback(e))) {
            // Not closing Popover to allow user to freely switch between manually entering a date
            // string in the input and selecting one via the Popover
            (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else {
            (_c = getKeyboardFocusableElements(popoverContentRef).shift()) === null || _c === void 0 ? void 0 : _c.focus();
        }
    }, []);
    var handleEndFocusBoundaryFocusIn = React.useCallback(function (e) {
        var _a, _b, _c;
        if ((_a = popoverContentRef.current) === null || _a === void 0 ? void 0 : _a.contains(getRelatedTargetWithFallback(e))) {
            (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            handlePopoverClose(e);
        }
        else {
            (_c = getKeyboardFocusableElements(popoverContentRef).pop()) === null || _c === void 0 ? void 0 : _c.focus();
        }
    }, []);
    // React's onFocus prop listens to the focusin browser event under the hood, so it's safe to
    // provide it the focusIn event handlers instead of using a ref and manually adding the
    // event listeners ourselves.
    var popoverContent = (React.createElement("div", { ref: popoverContentRef },
        React.createElement("div", { onFocus: handleStartFocusBoundaryFocusIn, tabIndex: 0 }),
        React.createElement(datetime_1.DatePicker, tslib_1.__assign({}, datePickerProps, { dayPickerProps: dayPickerProps, maxDate: maxDate, minDate: minDate, onChange: handleDateChange, onShortcutChange: handleShortcutChange, selectedShortcutIndex: selectedShortcutIndex, timePrecision: timePrecision, 
            // the rest of this component handles invalid dates gracefully (to show error messages),
            // but DatePicker does not, so we must take care to filter those out
            value: isErrorState ? null : valueAsDate })),
        React.createElement("div", { onFocus: handleEndFocusBoundaryFocusIn, tabIndex: 0 })));
    // Timezone select
    // ------------------------------------------------------------------------
    // we need a date which is guaranteed to be non-null here; if necessary,
    // we use today's date and shift it to the desired/current timezone
    var tzSelectDate = React.useMemo(function () {
        return valueAsDate != null && (0, dateUtils_1.isDateValid)(valueAsDate)
            ? valueAsDate
            : (0, timezoneUtils_1.convertLocalDateToTimezoneTime)(new Date(), timezoneValue);
    }, [timezoneValue, valueAsDate]);
    var isTimezoneSelectHidden = timePrecision === undefined || showTimezoneSelect === false;
    var isTimezoneSelectDisabled = props.disabled || disableTimezoneSelect;
    var handleTimezoneChange = React.useCallback(function (newTimezone) {
        var _a;
        if (valueAsDate !== null) {
            setTimezoneValue(newTimezone);
            var newDateString = (0, timezoneUtils_1.getIsoEquivalentWithUpdatedTimezone)(valueAsDate, newTimezone, timePrecision);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, newDateString, true);
        }
    }, [props.onChange, valueAsDate, timePrecision]);
    var maybeTimezonePicker = isTimezoneSelectHidden ? undefined : (React.createElement(timezoneSelect_1.TimezoneSelect, { value: timezoneValue, onChange: handleTimezoneChange, date: tzSelectDate, disabled: isTimezoneSelectDisabled, className: Classes.DATE_INPUT_TIMEZONE_SELECT, buttonProps: timezoneSelectButtonProps },
        React.createElement(core_1.Tag, { rightIcon: isTimezoneSelectDisabled ? undefined : "caret-down", interactive: !isTimezoneSelectDisabled, minimal: true }, (0, timezoneNameUtils_1.getTimezoneShortName)(timezoneValue, tzSelectDate))));
    // Text input
    // ------------------------------------------------------------------------
    var parseDate = React.useCallback(function (dateString) {
        if (dateString === props.outOfRangeMessage || dateString === props.invalidDateMessage) {
            return null;
        }
        var newDate = props.parseDate(dateString, props.locale);
        return newDate === false ? INVALID_DATE : newDate;
    }, 
    // HACKHACK: ESLint false positive
    // eslint-disable-next-line @typescript-eslint/unbound-method
    [props.outOfRangeMessage, props.invalidDateMessage, props.parseDate, props.locale]);
    var handleInputFocus = React.useCallback(function (e) {
        var _a, _b;
        setIsInputFocused(true);
        setIsOpen(true);
        setInputValue(formattedDateString);
        (_b = (_a = props.inputProps) === null || _a === void 0 ? void 0 : _a.onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    }, [formattedDateString, (_a = props.inputProps) === null || _a === void 0 ? void 0 : _a.onFocus]);
    var handleInputBlur = React.useCallback(function (e) {
        var _a, _b, _c, _d;
        if (inputValue == null || valueAsDate == null) {
            return;
        }
        var date = parseDate(inputValue);
        if (inputValue.length > 0 &&
            inputValue !== formattedDateString &&
            (!(0, dateUtils_1.isDateValid)(date) || !(0, dateUtils_1.isDayInRange)(date, [minDate, maxDate]))) {
            if (isControlled) {
                setIsInputFocused(false);
            }
            else {
                setIsInputFocused(false);
                setValue(date);
                setInputValue(undefined);
            }
            if (date === null) {
                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, null, true);
            }
            else {
                (_b = props.onError) === null || _b === void 0 ? void 0 : _b.call(props, date);
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
        (_d = (_c = props.inputProps) === null || _c === void 0 ? void 0 : _c.onBlur) === null || _d === void 0 ? void 0 : _d.call(_c, e);
    }, [
        parseDate,
        formattedDateString,
        inputValue,
        valueAsDate,
        minDate,
        maxDate,
        props.onChange,
        props.onError,
        (_b = props.inputProps) === null || _b === void 0 ? void 0 : _b.onBlur,
    ]);
    var handleInputChange = React.useCallback(function (e) {
        var _a, _b, _c, _d;
        var valueString = e.target.value;
        var inputValueAsDate = parseDate(valueString);
        if ((0, dateUtils_1.isDateValid)(inputValueAsDate) && (0, dateUtils_1.isDayInRange)(inputValueAsDate, [minDate, maxDate])) {
            if (isControlled) {
                setInputValue(valueString);
            }
            else {
                setValue(inputValueAsDate);
                setInputValue(valueString);
            }
            var newIsoDateString = (0, timezoneUtils_1.getIsoEquivalentWithUpdatedTimezone)(inputValueAsDate, timezoneValue, timePrecision);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, newIsoDateString, true);
        }
        else {
            if (valueString.length === 0) {
                (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, null, true);
            }
            setValue(inputValueAsDate);
            setInputValue(valueString);
        }
        (_d = (_c = props.inputProps) === null || _c === void 0 ? void 0 : _c.onChange) === null || _d === void 0 ? void 0 : _d.call(_c, e);
    }, [minDate, maxDate, timezoneValue, timePrecision, parseDate, props.onChange, (_c = props.inputProps) === null || _c === void 0 ? void 0 : _c.onChange]);
    var handleInputClick = React.useCallback(function (e) {
        var _a, _b;
        // stop propagation to the Popover's internal handleTargetClick handler;
        // otherwise, the popover will flicker closed as soon as it opens.
        e.stopPropagation();
        (_b = (_a = props.inputProps) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    }, [(_d = props.inputProps) === null || _d === void 0 ? void 0 : _d.onClick]);
    var handleInputKeyDown = React.useCallback(function (e) {
        var _a, _b, _c, _d;
        if (e.key === "Tab" && e.shiftKey) {
            // close popover on SHIFT+TAB key press
            handlePopoverClose(e);
        }
        else if (e.key === "Tab" && isOpen) {
            (_a = getKeyboardFocusableElements(popoverContentRef).shift()) === null || _a === void 0 ? void 0 : _a.focus();
            // necessary to prevent focusing the second focusable element
            e.preventDefault();
        }
        else if (e.key === "Escape") {
            setIsOpen(false);
            (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
        else if (e.key === "Enter" && inputValue != null) {
            var nextDate = parseDate(inputValue);
            if ((0, dateUtils_1.isDateValid)(nextDate)) {
                handleDateChange(nextDate, true, true);
            }
        }
        (_d = (_c = props.inputProps) === null || _c === void 0 ? void 0 : _c.onKeyDown) === null || _d === void 0 ? void 0 : _d.call(_c, e);
    }, [inputValue, parseDate, (_e = props.inputProps) === null || _e === void 0 ? void 0 : _e.onKeyDown]);
    // Main render
    // ------------------------------------------------------------------------
    var shouldShowErrorStyling = !isInputFocused || inputValue === props.outOfRangeMessage || inputValue === props.invalidDateMessage;
    // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like the "fill" prop.
    var renderTarget = React.useCallback(
    // N.B. pull out `defaultValue` so that it's not forwarded to the DOM.
    function (_a) {
        var _b, _c, _d;
        var _defaultValue = _a.defaultValue, targetIsOpen = _a.isOpen, ref = _a.ref, targetProps = tslib_1.__rest(_a, ["defaultValue", "isOpen", "ref"]);
        return (React.createElement(core_1.InputGroup, tslib_1.__assign({ autoComplete: "off", className: (0, classnames_1.default)(targetProps.className, inputProps.className), intent: shouldShowErrorStyling && isErrorState ? "danger" : "none", placeholder: placeholder, rightElement: React.createElement(React.Fragment, null,
                maybeTimezonePicker,
                props.rightElement), type: "text" }, targetProps, inputProps, { "aria-expanded": targetIsOpen, disabled: props.disabled, fill: fill, inputRef: (0, core_1.mergeRefs)(ref, inputRef, (_c = (_b = props.inputProps) === null || _b === void 0 ? void 0 : _b.inputRef) !== null && _c !== void 0 ? _c : null), onBlur: handleInputBlur, onChange: handleInputChange, onClick: handleInputClick, onFocus: handleInputFocus, onKeyDown: handleInputKeyDown, value: (_d = (isInputFocused ? inputValue : formattedDateString)) !== null && _d !== void 0 ? _d : "" })));
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
    return (React.createElement(popover2_1.Popover2, tslib_1.__assign({ isOpen: isOpen && !props.disabled }, popoverProps, { autoFocus: false, className: (0, classnames_1.default)(Classes.DATE_INPUT, popoverProps.className, props.className), content: popoverContent, enforceFocus: false, onClose: handlePopoverClose, popoverClassName: (0, classnames_1.default)(Classes.DATE_INPUT_POPOVER, popoverProps.popoverClassName), renderTarget: renderTarget })));
});
exports.DateInput2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".DateInput2");
exports.DateInput2.defaultProps = {
    closeOnSelection: true,
    disabled: false,
    invalidDateMessage: "Invalid date",
    maxDate: DEFAULT_MAX_DATE,
    minDate: DEFAULT_MIN_DATE,
    outOfRangeMessage: "Out of range",
    reverseMonthAndYearMenus: false,
};
function getRelatedTargetWithFallback(e) {
    var _a;
    return ((_a = e.relatedTarget) !== null && _a !== void 0 ? _a : core_1.Utils.getActiveElement(e.currentTarget));
}
function getKeyboardFocusableElements(popoverContentRef) {
    if (popoverContentRef.current === null) {
        return [];
    }
    var elements = Array.from(popoverContentRef.current.querySelectorAll("button:not([disabled]),input,[tabindex]:not([tabindex='-1'])"));
    // Remove focus boundary div elements
    elements.pop();
    elements.shift();
    return elements;
}
function hasMonthChanged(prevDate, nextDate) {
    return (prevDate == null) !== (nextDate == null) || (nextDate === null || nextDate === void 0 ? void 0 : nextDate.getMonth()) !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getMonth());
}
function hasTimeChanged(prevDate, nextDate) {
    return ((prevDate == null) !== (nextDate == null) ||
        (nextDate === null || nextDate === void 0 ? void 0 : nextDate.getHours()) !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getHours()) ||
        (nextDate === null || nextDate === void 0 ? void 0 : nextDate.getMinutes()) !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getMinutes()) ||
        (nextDate === null || nextDate === void 0 ? void 0 : nextDate.getSeconds()) !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getSeconds()) ||
        (nextDate === null || nextDate === void 0 ? void 0 : nextDate.getMilliseconds()) !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getMilliseconds()));
}
//# sourceMappingURL=dateInput2.js.map