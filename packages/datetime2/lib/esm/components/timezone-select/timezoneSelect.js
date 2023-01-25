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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Button, Classes as CoreClasses, DISPLAYNAME_PREFIX, MenuItem, } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";
import * as Classes from "../../common/classes";
import { formatTimezone, TimezoneDisplayFormat } from "../../common/timezoneDisplayFormat";
import { TIMEZONE_ITEMS } from "../../common/timezoneItems";
import { getInitialTimezoneItems, mapTimezonesWithNames } from "../../common/timezoneNameUtils";
var TimezoneSelect = /** @class */ (function (_super) {
    __extends(TimezoneSelect, _super);
    function TimezoneSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.filterItems = function (query, items) {
            // using list predicate so only one RegExp instance is needed
            // escape bad regex characters, let spaces act as any separator
            var expr = new RegExp(query.replace(/([[()+*?])/g, "\\$1").replace(" ", "[ _/\\(\\)]+"), "i");
            return items.filter(function (item) {
                return expr.test(item.ianaCode) ||
                    expr.test(item.label) ||
                    expr.test(item.longName) ||
                    expr.test(item.shortName);
            });
        };
        _this.renderItem = function (item, _a) {
            var handleClick = _a.handleClick, modifiers = _a.modifiers;
            if (!modifiers.matchesPredicate) {
                return null;
            }
            return (React.createElement(MenuItem, { key: item.ianaCode, selected: modifiers.active, text: "".concat(item.label, ", ").concat(item.longName), onClick: handleClick, label: item.shortName, shouldDismissPopover: false }));
        };
        _this.handleItemSelect = function (timezone) { var _a, _b; return (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, timezone.ianaCode); };
        _this.handleQueryChange = function (query) { return _this.setState({ query: query }); };
        var showLocalTimezone = props.showLocalTimezone, _a = props.inputProps, inputProps = _a === void 0 ? {} : _a, date = props.date;
        _this.state = { query: inputProps.value || "" };
        _this.timezoneItems = mapTimezonesWithNames(date, TIMEZONE_ITEMS);
        _this.initialTimezoneItems = getInitialTimezoneItems(date, showLocalTimezone);
        return _this;
    }
    TimezoneSelect.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, disabled = _a.disabled, fill = _a.fill, inputProps = _a.inputProps, popoverProps = _a.popoverProps;
        var query = this.state.query;
        return (React.createElement(Select2, { className: classNames(Classes.TIMEZONE_SELECT, className), disabled: disabled, fill: fill, inputProps: __assign({ placeholder: "Search for timezones..." }, inputProps), itemListPredicate: this.filterItems, itemRenderer: this.renderItem, items: query ? this.timezoneItems : this.initialTimezoneItems, noResults: React.createElement(MenuItem, { disabled: true, text: "No matching timezones." }), onItemSelect: this.handleItemSelect, onQueryChange: this.handleQueryChange, popoverProps: __assign(__assign({}, popoverProps), { popoverClassName: classNames(Classes.TIMEZONE_SELECT_POPOVER, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.popoverClassName) }), resetOnClose: true, resetOnSelect: true }, children !== null && children !== void 0 ? children : this.renderButton()));
    };
    TimezoneSelect.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        var nextDate = this.props.date;
        if (this.props.showLocalTimezone !== prevProps.showLocalTimezone) {
            this.initialTimezoneItems = getInitialTimezoneItems(nextDate, this.props.showLocalTimezone);
        }
        if (nextDate != null && nextDate.getTime() !== ((_a = prevProps.date) === null || _a === void 0 ? void 0 : _a.getTime())) {
            this.initialTimezoneItems = mapTimezonesWithNames(nextDate, this.initialTimezoneItems);
            this.timezoneItems = mapTimezonesWithNames(nextDate, this.timezoneItems);
        }
    };
    TimezoneSelect.prototype.renderButton = function () {
        var _a = this.props, _b = _a.buttonProps, buttonProps = _b === void 0 ? {} : _b, disabled = _a.disabled, fill = _a.fill, placeholder = _a.placeholder, value = _a.value, valueDisplayFormat = _a.valueDisplayFormat;
        var selectedTimezone = this.timezoneItems.find(function (tz) { return tz.ianaCode === value; });
        var buttonContent = selectedTimezone !== undefined ? (formatTimezone(selectedTimezone, valueDisplayFormat !== null && valueDisplayFormat !== void 0 ? valueDisplayFormat : TimezoneDisplayFormat.COMPOSITE)) : (React.createElement("span", { className: CoreClasses.TEXT_MUTED }, placeholder));
        return React.createElement(Button, __assign({ rightIcon: "caret-down", disabled: disabled, text: buttonContent, fill: fill }, buttonProps));
    };
    TimezoneSelect.displayName = "".concat(DISPLAYNAME_PREFIX, ".TimezoneSelect");
    TimezoneSelect.defaultProps = {
        date: new Date(),
        disabled: false,
        fill: false,
        inputProps: {},
        placeholder: "Select timezone...",
        popoverProps: {},
        showLocalTimezone: false,
    };
    return TimezoneSelect;
}(AbstractPureComponent2));
export { TimezoneSelect };
//# sourceMappingURL=timezoneSelect.js.map