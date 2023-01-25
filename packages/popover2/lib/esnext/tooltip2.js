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
import { Classes as CoreClasses, DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "./classes";
// eslint-disable-next-line import/no-cycle
import { Popover2, Popover2InteractionKind } from "./popover2";
import { TOOLTIP_ARROW_SVG_SIZE } from "./popover2Arrow";
import { Tooltip2Context, Tooltip2Provider } from "./tooltip2Context";
export class Tooltip2 extends React.PureComponent {
    static displayName = `${DISPLAYNAME_PREFIX}.Tooltip2`;
    static defaultProps = {
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        minimal: false,
        transitionDuration: 100,
    };
    popover = null;
    render() {
        // if we have an ancestor Tooltip2Context, we should take its state into account in this render path,
        // it was likely created by a parent ContextMenu2
        return (React.createElement(Tooltip2Context.Consumer, null, ([state]) => React.createElement(Tooltip2Provider, { ...state }, this.renderPopover)));
    }
    reposition() {
        if (this.popover != null) {
            this.popover.reposition();
        }
    }
    // any descendant ContextMenu2s may update this ctxState
    renderPopover = (ctxState) => {
        const { children, disabled, intent, popoverClassName, ...restProps } = this.props;
        const classes = classNames(Classes.TOOLTIP2, { [CoreClasses.MINIMAL]: this.props.minimal }, CoreClasses.intentClass(intent), popoverClassName);
        return (React.createElement(Popover2, { interactionKind: Popover2InteractionKind.HOVER_TARGET_ONLY, modifiers: {
                arrow: {
                    enabled: !this.props.minimal,
                },
                offset: {
                    options: {
                        offset: [0, TOOLTIP_ARROW_SVG_SIZE / 2],
                    },
                },
            }, ...restProps, autoFocus: false, canEscapeKeyClose: false, disabled: ctxState.forceDisabled ?? disabled, enforceFocus: false, lazy: true, popoverClassName: classes, portalContainer: this.props.portalContainer, ref: ref => (this.popover = ref) }, children));
    };
}
//# sourceMappingURL=tooltip2.js.map