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
const TypedSelect = Select.ofType();
/** @deprecated use { TimezoneSelect } from "@blueprintjs/datetime2" */
export class TimezonePicker extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.TimezonePicker`;
    static defaultProps = {
        date: new Date(),
        disabled: false,
        inputProps: {},
        placeholder: "Select timezone...",
        popoverProps: {},
        showLocalTimezone: true,
        valueDisplayFormat: TimezoneDisplayFormat.OFFSET,
    };
    timezoneItems;
    initialTimezoneItems;
    constructor(props, context) {
        super(props, context);
        const { date = new Date(), showLocalTimezone, inputProps = {} } = props;
        this.state = { query: inputProps.value || "" };
        this.timezoneItems = getTimezoneItems(date);
        this.initialTimezoneItems = getInitialTimezoneItems(date, showLocalTimezone);
    }
    render() {
        const { children, className, disabled, inputProps, popoverProps } = this.props;
        const { query } = this.state;
        const finalInputProps = {
            placeholder: "Search for timezones...",
            ...inputProps,
        };
        // eslint-disable-next-line deprecation/deprecation
        const finalPopoverProps = {
            ...popoverProps,
            popoverClassName: classNames(Classes.TIMEZONE_PICKER_POPOVER, popoverProps.popoverClassName),
        };
        return (React.createElement(TypedSelect, { className: classNames(Classes.TIMEZONE_PICKER, className), items: query ? this.timezoneItems : this.initialTimezoneItems, itemListPredicate: this.filterItems, itemRenderer: this.renderItem, noResults: React.createElement(MenuItem, { disabled: true, text: "No matching timezones." }), onItemSelect: this.handleItemSelect, resetOnSelect: true, resetOnClose: true, popoverProps: finalPopoverProps, inputProps: finalInputProps, disabled: disabled, onQueryChange: this.handleQueryChange }, children != null ? children : this.renderButton()));
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        const { date: nextDate = new Date(), inputProps: nextInputProps = {} } = this.props;
        if (this.props.showLocalTimezone !== prevProps.showLocalTimezone) {
            this.initialTimezoneItems = getInitialTimezoneItems(nextDate, this.props.showLocalTimezone);
        }
        if (nextInputProps.value !== undefined && this.state.query !== nextInputProps.value) {
            this.setState({ query: nextInputProps.value });
        }
    }
    validateProps(props) {
        const childrenCount = React.Children.count(props.children);
        if (childrenCount > 1) {
            console.warn(Errors.TIMEZONE_PICKER_WARN_TOO_MANY_CHILDREN);
        }
    }
    renderButton() {
        const { buttonProps = {}, date, disabled, placeholder, value, valueDisplayFormat } = this.props;
        const buttonContent = value ? (formatTimezone(value, date, valueDisplayFormat)) : (React.createElement("span", { className: CoreClasses.TEXT_MUTED }, placeholder));
        return React.createElement(Button, { rightIcon: "caret-down", disabled: disabled, text: buttonContent, ...buttonProps });
    }
    filterItems = (query, items) => {
        // using list predicate so only one RegExp instance is needed
        // escape bad regex characters, let spaces act as any separator
        const expr = new RegExp(query.replace(/([[()+*?])/g, "\\$1").replace(" ", "[ _/\\(\\)]+"), "i");
        return items.filter(item => expr.test(item.text + item.label));
    };
    renderItem = (item, { handleClick, handleFocus, modifiers }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (React.createElement(MenuItem, { key: item.key, selected: modifiers.active, icon: item.iconName, text: item.text, label: item.label, onClick: handleClick, onFocus: handleFocus, shouldDismissPopover: false }));
    };
    handleItemSelect = (timezone) => this.props.onChange?.(timezone.timezone);
    handleQueryChange = (query) => this.setState({ query });
}
//# sourceMappingURL=timezonePicker.js.map