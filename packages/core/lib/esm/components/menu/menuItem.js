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
import { __assign, __extends, __rest } from "tslib";
/* eslint-disable deprecation/deprecation */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Classes, Position } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { Icon } from "../icon/icon";
import { Popover, PopoverInteractionKind } from "../popover/popover";
import { Text } from "../text/text";
import { Menu } from "./menu";
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItem.prototype.render = function () {
        var _a, _b;
        var _c = this.props, 
        // eslint-disable-next-line deprecation/deprecation
        active = _c.active, className = _c.className, children = _c.children, disabled = _c.disabled, icon = _c.icon, intent = _c.intent, labelClassName = _c.labelClassName, labelElement = _c.labelElement, multiline = _c.multiline, popoverProps = _c.popoverProps, _d = _c.roleStructure, roleStructure = _d === void 0 ? "menuitem" : _d, selected = _c.selected, shouldDismissPopover = _c.shouldDismissPopover, submenuProps = _c.submenuProps, text = _c.text, textClassName = _c.textClassName, _e = _c.tagName, tagName = _e === void 0 ? "a" : _e, htmlTitle = _c.htmlTitle, htmlProps = __rest(_c, ["active", "className", "children", "disabled", "icon", "intent", "labelClassName", "labelElement", "multiline", "popoverProps", "roleStructure", "selected", "shouldDismissPopover", "submenuProps", "text", "textClassName", "tagName", "htmlTitle"]);
        var hasIcon = icon != null;
        var hasSubmenu = children != null;
        var intentClass = Classes.intentClass(intent);
        var anchorClasses = classNames(Classes.MENU_ITEM, intentClass, (_a = {},
            _a[Classes.ACTIVE] = active,
            _a[Classes.DISABLED] = disabled,
            // prevent popover from closing when clicking on submenu trigger or disabled item
            _a[Classes.POPOVER_DISMISS] = shouldDismissPopover && !disabled && !hasSubmenu,
            _a[Classes.SELECTED] = selected || (active && intentClass === undefined),
            _a), className);
        var _f = roleStructure === "listoption"
            ? ["option", undefined, active || selected] // parent has listbox role, or is a <select>
            : ["none", "menuitem", undefined], liRole = _f[0], targetRole = _f[1], ariaSelected = _f[2]; // parent has menu role
        var target = React.createElement(tagName, __assign(__assign(__assign({ role: targetRole, tabIndex: 0 }, htmlProps), (disabled ? DISABLED_PROPS : {})), { className: anchorClasses }), hasIcon ? (
        // wrap icon in a <span> in case `icon` is a custom element rather than a built-in icon identifier,
        // so that we always render this class
        React.createElement("span", { className: Classes.MENU_ITEM_ICON },
            React.createElement(Icon, { icon: icon, "aria-hidden": true, tabIndex: -1 }))) : undefined, React.createElement(Text, { className: classNames(Classes.FILL, textClassName), ellipsize: !multiline, title: htmlTitle }, text), this.maybeRenderLabel(labelElement), hasSubmenu ? React.createElement(Icon, { className: Classes.MENU_SUBMENU_ICON, icon: "caret-right" }) : undefined);
        var liClasses = classNames((_b = {}, _b[Classes.MENU_SUBMENU] = hasSubmenu, _b));
        return (React.createElement("li", { className: liClasses, role: liRole, "aria-selected": ariaSelected }, this.maybeRenderPopover(target, children)));
    };
    MenuItem.prototype.maybeRenderLabel = function (labelElement) {
        var _a = this.props, label = _a.label, labelClassName = _a.labelClassName;
        if (label == null && labelElement == null) {
            return null;
        }
        return (React.createElement("span", { className: classNames(Classes.MENU_ITEM_LABEL, labelClassName) },
            label,
            labelElement));
    };
    MenuItem.prototype.maybeRenderPopover = function (target, children) {
        if (children == null) {
            return target;
        }
        var _a = this.props, disabled = _a.disabled, popoverProps = _a.popoverProps, submenuProps = _a.submenuProps;
        return (React.createElement(Popover, __assign({ autoFocus: false, captureDismiss: false, disabled: disabled, enforceFocus: false, hoverCloseDelay: 0, interactionKind: PopoverInteractionKind.HOVER, modifiers: SUBMENU_POPOVER_MODIFIERS, position: Position.RIGHT_TOP, usePortal: false }, popoverProps, { content: React.createElement(Menu, __assign({}, submenuProps), children), minimal: true, popoverClassName: classNames(Classes.MENU_SUBMENU, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.popoverClassName), target: target })));
    };
    MenuItem.defaultProps = {
        active: false,
        disabled: false,
        multiline: false,
        popoverProps: {},
        selected: false,
        shouldDismissPopover: true,
        text: "",
    };
    MenuItem.displayName = "".concat(DISPLAYNAME_PREFIX, ".MenuItem");
    return MenuItem;
}(AbstractPureComponent2));
export { MenuItem };
var SUBMENU_POPOVER_MODIFIERS = {
    // 20px padding - scrollbar width + a bit
    flip: { boundariesElement: "viewport", padding: 20 },
    // shift popover up 5px so MenuItems align
    offset: { offset: -5 },
    preventOverflow: { boundariesElement: "viewport", padding: 20 },
};
// props to ignore when disabled
var DISABLED_PROPS = {
    href: undefined,
    onClick: undefined,
    onMouseDown: undefined,
    onMouseEnter: undefined,
    onMouseLeave: undefined,
    tabIndex: -1,
};
//# sourceMappingURL=menuItem.js.map