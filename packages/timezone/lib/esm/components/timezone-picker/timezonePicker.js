/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
import { __assign, __extends } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to TimezoneSelect instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Button, Classes as CoreClasses, DISPLAYNAME_PREFIX, MenuItem, } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { formatTimezone, TimezoneDisplayFormat } from "./timezoneDisplayFormat";
import { getInitialTimezoneItems, getTimezoneItems } from "./timezoneItems";
export { TimezoneDisplayFormat };
// eslint-disable-next-line deprecation/deprecation
var TypedSelect = Select.ofType();
/** @deprecated use { TimezoneSelect } from "@blueprintjs/datetime2" */
var TimezonePicker = /** @class */ (function (_super) {
    __extends(TimezonePicker, _super);
    function TimezonePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.filterItems = function (query, items) {
            // using list predicate so only one RegExp instance is needed
            // escape bad regex characters, let spaces act as any separator
            var expr = new RegExp(query.replace(/([[()+*?])/g, "\\$1").replace(" ", "[ _/\\(\\)]+"), "i");
            return items.filter(function (item) { return expr.test(item.text + item.label); });
        };
        _this.renderItem = function (item, _a) {
            var handleClick = _a.handleClick, handleFocus = _a.handleFocus, modifiers = _a.modifiers;
            if (!modifiers.matchesPredicate) {
                return null;
            }
            return (React.createElement(MenuItem, { key: item.key, selected: modifiers.active, icon: item.iconName, text: item.text, label: item.label, onClick: handleClick, onFocus: handleFocus, shouldDismissPopover: false }));
        };
        _this.handleItemSelect = function (timezone) { var _a, _b; return (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, timezone.timezone); };
        _this.handleQueryChange = function (query) { return _this.setState({ query: query }); };
        var _a = props.date, date = _a === void 0 ? new Date() : _a, showLocalTimezone = props.showLocalTimezone, _b = props.inputProps, inputProps = _b === void 0 ? {} : _b;
        _this.state = { query: inputProps.value || "" };
        _this.timezoneItems = getTimezoneItems(date);
        _this.initialTimezoneItems = getInitialTimezoneItems(date, showLocalTimezone);
        return _this;
    }
    TimezonePicker.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, disabled = _a.disabled, inputProps = _a.inputProps, popoverProps = _a.popoverProps;
        var query = this.state.query;
        var finalInputProps = __assign({ placeholder: "Search for timezones..." }, inputProps);
        // eslint-disable-next-line deprecation/deprecation
        var finalPopoverProps = __assign(__assign({}, popoverProps), { popoverClassName: classNames(Classes.TIMEZONE_PICKER_POPOVER, popoverProps.popoverClassName) });
        return (React.createElement(TypedSelect, { className: classNames(Classes.TIMEZONE_PICKER, className), items: query ? this.timezoneItems : this.initialTimezoneItems, itemListPredicate: this.filterItems, itemRenderer: this.renderItem, noResults: React.createElement(MenuItem, { disabled: true, text: "No matching timezones." }), onItemSelect: this.handleItemSelect, resetOnSelect: true, resetOnClose: true, popoverProps: finalPopoverProps, inputProps: finalInputProps, disabled: disabled, onQueryChange: this.handleQueryChange }, children != null ? children : this.renderButton()));
    };
    TimezonePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        var _a = this.props, _b = _a.date, nextDate = _b === void 0 ? new Date() : _b, _c = _a.inputProps, nextInputProps = _c === void 0 ? {} : _c;
        if (this.props.showLocalTimezone !== prevProps.showLocalTimezone) {
            this.initialTimezoneItems = getInitialTimezoneItems(nextDate, this.props.showLocalTimezone);
        }
        if (nextInputProps.value !== undefined && this.state.query !== nextInputProps.value) {
            this.setState({ query: nextInputProps.value });
        }
    };
    TimezonePicker.prototype.validateProps = function (props) {
        var childrenCount = React.Children.count(props.children);
        if (childrenCount > 1) {
            console.warn(Errors.TIMEZONE_PICKER_WARN_TOO_MANY_CHILDREN);
        }
    };
    TimezonePicker.prototype.renderButton = function () {
        var _a = this.props, _b = _a.buttonProps, buttonProps = _b === void 0 ? {} : _b, date = _a.date, disabled = _a.disabled, placeholder = _a.placeholder, value = _a.value, valueDisplayFormat = _a.valueDisplayFormat;
        var buttonContent = value ? (formatTimezone(value, date, valueDisplayFormat)) : (React.createElement("span", { className: CoreClasses.TEXT_MUTED }, placeholder));
        return React.createElement(Button, __assign({ rightIcon: "caret-down", disabled: disabled, text: buttonContent }, buttonProps));
    };
    TimezonePicker.displayName = "".concat(DISPLAYNAME_PREFIX, ".TimezonePicker");
    TimezonePicker.defaultProps = {
        date: new Date(),
        disabled: false,
        inputProps: {},
        placeholder: "Select timezone...",
        popoverProps: {},
        showLocalTimezone: true,
        valueDisplayFormat: TimezoneDisplayFormat.OFFSET,
    };
    return TimezonePicker;
}(AbstractPureComponent2));
export { TimezonePicker };
//# sourceMappingURL=timezonePicker.js.map