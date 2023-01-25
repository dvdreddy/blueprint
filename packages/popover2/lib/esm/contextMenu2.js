/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
import { __assign, __rest } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, Utils as CoreUtils, mergeRefs, Portal, } from "@blueprintjs/core";
import * as Classes from "./classes";
import { Popover2 } from "./popover2";
import { Tooltip2Context, Tooltip2Provider } from "./tooltip2Context";
export var ContextMenu2 = React.forwardRef(function (props, userRef) {
    var _a;
    var _b, _c;
    var className = props.className, children = props.children, content = props.content, _d = props.disabled, disabled = _d === void 0 ? false : _d, onContextMenu = props.onContextMenu, popoverProps = props.popoverProps, _e = props.tagName, tagName = _e === void 0 ? "div" : _e, restProps = __rest(props, ["className", "children", "content", "disabled", "onContextMenu", "popoverProps", "tagName"]);
    // ancestor Tooltip2Context state doesn't affect us since we don't care about parent ContextMenu2s, we only want to
    // force disable parent Tooltip2s in certain cases through dispatching actions
    // N.B. any calls to this dispatch function will be no-ops if there is no Tooltip2Provider ancestor of this component
    var _f = React.useContext(Tooltip2Context), tooltipCtxDispatch = _f[1];
    // click target offset relative to the viewport (e.clientX/clientY), since the target will be rendered in a Portal
    var _g = React.useState(undefined), targetOffset = _g[0], setTargetOffset = _g[1];
    // hold a reference to the click mouse event to pass to content/child render functions
    var _h = React.useState(), mouseEvent = _h[0], setMouseEvent = _h[1];
    var _j = React.useState(false), isOpen = _j[0], setIsOpen = _j[1];
    // we need a ref on the child element (or the wrapper we generate) to check for dark theme
    var childRef = React.useRef(null);
    // If disabled prop is changed, we don't want our old context menu to stick around.
    // If it has just been enabled (disabled = false), then the menu ought to be opened by
    // a new mouse event. Users should not be updating this prop in the onContextMenu callback
    // for this component (that will lead to unpredictable behavior).
    React.useEffect(function () {
        setIsOpen(false);
        tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
    }, [disabled]);
    var cancelContextMenu = React.useCallback(function (e) { return e.preventDefault(); }, []);
    var handlePopoverInteraction = React.useCallback(function (nextOpenState) {
        if (!nextOpenState) {
            setIsOpen(false);
            setMouseEvent(undefined);
            tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
        }
    }, []);
    // Popover2 should attach its ref to the virtual target we render inside a Portal, not the "inline" child target
    var renderTarget = React.useCallback(function (_a) {
        var ref = _a.ref;
        return (React.createElement(Portal, null,
            React.createElement("div", { className: Classes.CONTEXT_MENU2_VIRTUAL_TARGET, style: targetOffset, ref: ref })));
    }, [targetOffset]);
    // if the menu was just opened, we should check for dark theme (but don't do this on every render)
    var isDarkTheme = React.useMemo(function () { return CoreUtils.isDarkTheme(childRef.current); }, [childRef, isOpen]);
    // only render the popover if there is content in the context menu;
    // this avoid doing unnecessary rendering & computation
    var contentProps = { isOpen: isOpen, mouseEvent: mouseEvent, targetOffset: targetOffset };
    var menu = disabled ? undefined : CoreUtils.isFunction(content) ? content(contentProps) : content;
    var maybePopover = menu === undefined ? undefined : (React.createElement(Popover2, __assign({}, popoverProps, { content: 
        // this prevents right-clicking inside our context menu
        React.createElement("div", { onContextMenu: cancelContextMenu }, menu), enforceFocus: false, 
        // Generate key based on offset so that a new Popover instance is created
        // when offset changes, to force recomputing position.
        key: getPopoverKey(targetOffset), hasBackdrop: true, backdropProps: { className: Classes.CONTEXT_MENU2_BACKDROP }, isOpen: isOpen, minimal: true, onInteraction: handlePopoverInteraction, popoverClassName: classNames(Classes.CONTEXT_MENU2_POPOVER2, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.popoverClassName, (_a = {},
            _a[CoreClasses.DARK] = isDarkTheme,
            _a)), placement: "right-start", positioningStrategy: "fixed", rootBoundary: (_b = popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.rootBoundary) !== null && _b !== void 0 ? _b : "viewport", renderTarget: renderTarget, transitionDuration: (_c = popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.transitionDuration) !== null && _c !== void 0 ? _c : 100 })));
    var handleContextMenu = React.useCallback(function (e) {
        // support nested menus (inner menu target would have called preventDefault())
        if (e.defaultPrevented) {
            return;
        }
        // If disabled, we should avoid this extra work.
        // Otherwise: if using the child or content function APIs, we need to make sure contentProps gets updated,
        // so we handle the event regardless of whether the consumer returned an undefined menu.
        var shouldHandleEvent = !disabled &&
            (CoreUtils.isFunction(children) || CoreUtils.isFunction(content) || maybePopover !== undefined);
        if (shouldHandleEvent) {
            e.preventDefault();
            e.persist();
            setMouseEvent(e);
            setTargetOffset({ left: e.clientX, top: e.clientY });
            setIsOpen(true);
            tooltipCtxDispatch({ type: "FORCE_DISABLED_STATE" });
        }
        onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(e);
    }, [onContextMenu, disabled]);
    var containerClassName = classNames(className, Classes.CONTEXT_MENU2);
    var child = CoreUtils.isFunction(children) ? (children({
        className: containerClassName,
        contentProps: contentProps,
        onContextMenu: handleContextMenu,
        popover: maybePopover,
        ref: childRef,
    })) : (React.createElement(React.Fragment, null,
        maybePopover,
        React.createElement(tagName, __assign({ className: containerClassName, onContextMenu: handleContextMenu, ref: mergeRefs(childRef, userRef) }, restProps), children)));
    // force descendant Tooltip2s to be disabled when this context menu is open
    return React.createElement(Tooltip2Provider, { forceDisable: isOpen }, child);
});
ContextMenu2.displayName = "Blueprint.ContextMenu2";
function getPopoverKey(targetOffset) {
    return targetOffset === undefined ? "default" : "".concat(targetOffset.left, "x").concat(targetOffset.top);
}
//# sourceMappingURL=contextMenu2.js.map