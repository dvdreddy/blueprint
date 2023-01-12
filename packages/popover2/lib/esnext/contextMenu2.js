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
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, Utils as CoreUtils, mergeRefs, Portal, } from "@blueprintjs/core";
import * as Classes from "./classes";
import { Popover2 } from "./popover2";
import { Tooltip2Context, Tooltip2Provider } from "./tooltip2Context";
export const ContextMenu2 = React.forwardRef((props, userRef) => {
    const { className, children, content, disabled = false, onContextMenu, popoverProps, tagName = "div", ...restProps } = props;
    // ancestor Tooltip2Context state doesn't affect us since we don't care about parent ContextMenu2s, we only want to
    // force disable parent Tooltip2s in certain cases through dispatching actions
    // N.B. any calls to this dispatch function will be no-ops if there is no Tooltip2Provider ancestor of this component
    const [, tooltipCtxDispatch] = React.useContext(Tooltip2Context);
    // click target offset relative to the viewport (e.clientX/clientY), since the target will be rendered in a Portal
    const [targetOffset, setTargetOffset] = React.useState(undefined);
    // hold a reference to the click mouse event to pass to content/child render functions
    const [mouseEvent, setMouseEvent] = React.useState();
    const [isOpen, setIsOpen] = React.useState(false);
    // we need a ref on the child element (or the wrapper we generate) to check for dark theme
    const childRef = React.useRef(null);
    // If disabled prop is changed, we don't want our old context menu to stick around.
    // If it has just been enabled (disabled = false), then the menu ought to be opened by
    // a new mouse event. Users should not be updating this prop in the onContextMenu callback
    // for this component (that will lead to unpredictable behavior).
    React.useEffect(() => {
        setIsOpen(false);
        tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
    }, [disabled]);
    const cancelContextMenu = React.useCallback((e) => e.preventDefault(), []);
    const handlePopoverInteraction = React.useCallback((nextOpenState) => {
        if (!nextOpenState) {
            setIsOpen(false);
            setMouseEvent(undefined);
            tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
        }
    }, []);
    // Popover2 should attach its ref to the virtual target we render inside a Portal, not the "inline" child target
    const renderTarget = React.useCallback(({ ref }) => (React.createElement(Portal, null,
        React.createElement("div", { className: Classes.CONTEXT_MENU2_VIRTUAL_TARGET, style: targetOffset, ref: ref }))), [targetOffset]);
    // if the menu was just opened, we should check for dark theme (but don't do this on every render)
    const isDarkTheme = React.useMemo(() => CoreUtils.isDarkTheme(childRef.current), [childRef, isOpen]);
    // only render the popover if there is content in the context menu;
    // this avoid doing unnecessary rendering & computation
    const contentProps = { isOpen, mouseEvent, targetOffset };
    const menu = disabled ? undefined : CoreUtils.isFunction(content) ? content(contentProps) : content;
    const maybePopover = menu === undefined ? undefined : (React.createElement(Popover2, { ...popoverProps, content: 
        // this prevents right-clicking inside our context menu
        React.createElement("div", { onContextMenu: cancelContextMenu }, menu), enforceFocus: false, 
        // Generate key based on offset so that a new Popover instance is created
        // when offset changes, to force recomputing position.
        key: getPopoverKey(targetOffset), hasBackdrop: true, backdropProps: { className: Classes.CONTEXT_MENU2_BACKDROP }, isOpen: isOpen, minimal: true, onInteraction: handlePopoverInteraction, popoverClassName: classNames(Classes.CONTEXT_MENU2_POPOVER2, popoverProps?.popoverClassName, {
            [CoreClasses.DARK]: isDarkTheme,
        }), placement: "right-start", positioningStrategy: "fixed", rootBoundary: popoverProps?.rootBoundary ?? "viewport", renderTarget: renderTarget, transitionDuration: popoverProps?.transitionDuration ?? 100 }));
    const handleContextMenu = React.useCallback((e) => {
        // support nested menus (inner menu target would have called preventDefault())
        if (e.defaultPrevented) {
            return;
        }
        // If disabled, we should avoid this extra work.
        // Otherwise: if using the child or content function APIs, we need to make sure contentProps gets updated,
        // so we handle the event regardless of whether the consumer returned an undefined menu.
        const shouldHandleEvent = !disabled &&
            (CoreUtils.isFunction(children) || CoreUtils.isFunction(content) || maybePopover !== undefined);
        if (shouldHandleEvent) {
            e.preventDefault();
            e.persist();
            setMouseEvent(e);
            setTargetOffset({ left: e.clientX, top: e.clientY });
            setIsOpen(true);
            tooltipCtxDispatch({ type: "FORCE_DISABLED_STATE" });
        }
        onContextMenu?.(e);
    }, [onContextMenu, disabled]);
    const containerClassName = classNames(className, Classes.CONTEXT_MENU2);
    const child = CoreUtils.isFunction(children) ? (children({
        className: containerClassName,
        contentProps,
        onContextMenu: handleContextMenu,
        popover: maybePopover,
        ref: childRef,
    })) : (React.createElement(React.Fragment, null,
        maybePopover,
        React.createElement(tagName, {
            className: containerClassName,
            onContextMenu: handleContextMenu,
            ref: mergeRefs(childRef, userRef),
            ...restProps,
        }, children)));
    // force descendant Tooltip2s to be disabled when this context menu is open
    return React.createElement(Tooltip2Provider, { forceDisable: isOpen }, child);
});
ContextMenu2.displayName = "Blueprint.ContextMenu2";
function getPopoverKey(targetOffset) {
    return targetOffset === undefined ? "default" : `${targetOffset.left}x${targetOffset.top}`;
}
//# sourceMappingURL=contextMenu2.js.map