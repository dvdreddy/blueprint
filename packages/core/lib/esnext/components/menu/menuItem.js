/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
/* eslint-disable deprecation/deprecation */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Classes, Position } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { Icon } from "../icon/icon";
import { Popover, PopoverInteractionKind } from "../popover/popover";
import { Text } from "../text/text";
import { Menu } from "./menu";
export class MenuItem extends AbstractPureComponent2 {
    static defaultProps = {
        active: false,
        disabled: false,
        multiline: false,
        popoverProps: {},
        selected: false,
        shouldDismissPopover: true,
        text: "",
    };
    static displayName = `${DISPLAYNAME_PREFIX}.MenuItem`;
    render() {
        const { 
        // eslint-disable-next-line deprecation/deprecation
        active, className, children, disabled, icon, intent, labelClassName, labelElement, multiline, popoverProps, roleStructure = "menuitem", selected, shouldDismissPopover, submenuProps, text, textClassName, tagName = "a", htmlTitle, ...htmlProps } = this.props;
        const hasIcon = icon != null;
        const hasSubmenu = children != null;
        const intentClass = Classes.intentClass(intent);
        const anchorClasses = classNames(Classes.MENU_ITEM, intentClass, {
            [Classes.ACTIVE]: active,
            [Classes.DISABLED]: disabled,
            // prevent popover from closing when clicking on submenu trigger or disabled item
            [Classes.POPOVER_DISMISS]: shouldDismissPopover && !disabled && !hasSubmenu,
            [Classes.SELECTED]: selected || (active && intentClass === undefined),
        }, className);
        const [liRole, targetRole, ariaSelected] = roleStructure === "listoption"
            ? ["option", undefined, active || selected] // parent has listbox role, or is a <select>
            : ["none", "menuitem", undefined]; // parent has menu role
        const target = React.createElement(tagName, {
            role: targetRole,
            tabIndex: 0,
            ...htmlProps,
            ...(disabled ? DISABLED_PROPS : {}),
            className: anchorClasses,
        }, hasIcon ? (
        // wrap icon in a <span> in case `icon` is a custom element rather than a built-in icon identifier,
        // so that we always render this class
        React.createElement("span", { className: Classes.MENU_ITEM_ICON },
            React.createElement(Icon, { icon: icon, "aria-hidden": true, tabIndex: -1 }))) : undefined, React.createElement(Text, { className: classNames(Classes.FILL, textClassName), ellipsize: !multiline, title: htmlTitle }, text), this.maybeRenderLabel(labelElement), hasSubmenu ? React.createElement(Icon, { className: Classes.MENU_SUBMENU_ICON, icon: "caret-right" }) : undefined);
        const liClasses = classNames({ [Classes.MENU_SUBMENU]: hasSubmenu });
        return (React.createElement("li", { className: liClasses, role: liRole, "aria-selected": ariaSelected }, this.maybeRenderPopover(target, children)));
    }
    maybeRenderLabel(labelElement) {
        const { label, labelClassName } = this.props;
        if (label == null && labelElement == null) {
            return null;
        }
        return (React.createElement("span", { className: classNames(Classes.MENU_ITEM_LABEL, labelClassName) },
            label,
            labelElement));
    }
    maybeRenderPopover(target, children) {
        if (children == null) {
            return target;
        }
        const { disabled, popoverProps, submenuProps } = this.props;
        return (React.createElement(Popover, { autoFocus: false, captureDismiss: false, disabled: disabled, enforceFocus: false, hoverCloseDelay: 0, interactionKind: PopoverInteractionKind.HOVER, modifiers: SUBMENU_POPOVER_MODIFIERS, position: Position.RIGHT_TOP, usePortal: false, ...popoverProps, content: React.createElement(Menu, { ...submenuProps }, children), minimal: true, popoverClassName: classNames(Classes.MENU_SUBMENU, popoverProps?.popoverClassName), target: target }));
    }
}
const SUBMENU_POPOVER_MODIFIERS = {
    // 20px padding - scrollbar width + a bit
    flip: { boundariesElement: "viewport", padding: 20 },
    // shift popover up 5px so MenuItems align
    offset: { offset: -5 },
    preventOverflow: { boundariesElement: "viewport", padding: 20 },
};
// props to ignore when disabled
const DISABLED_PROPS = {
    href: undefined,
    onClick: undefined,
    onMouseDown: undefined,
    onMouseEnter: undefined,
    onMouseLeave: undefined,
    tabIndex: -1,
};
//# sourceMappingURL=menuItem.js.map