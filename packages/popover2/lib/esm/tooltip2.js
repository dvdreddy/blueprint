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
import { __assign, __extends, __rest } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "./classes";
// eslint-disable-next-line import/no-cycle
import { Popover2, Popover2InteractionKind } from "./popover2";
import { TOOLTIP_ARROW_SVG_SIZE } from "./popover2Arrow";
import { Tooltip2Context, Tooltip2Provider } from "./tooltip2Context";
var Tooltip2 = /** @class */ (function (_super) {
    __extends(Tooltip2, _super);
    function Tooltip2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popover = null;
        // any descendant ContextMenu2s may update this ctxState
        _this.renderPopover = function (ctxState) {
            var _a;
            var _b;
            var _c = _this.props, children = _c.children, disabled = _c.disabled, intent = _c.intent, popoverClassName = _c.popoverClassName, restProps = __rest(_c, ["children", "disabled", "intent", "popoverClassName"]);
            var classes = classNames(Classes.TOOLTIP2, (_a = {}, _a[CoreClasses.MINIMAL] = _this.props.minimal, _a), CoreClasses.intentClass(intent), popoverClassName);
            return (React.createElement(Popover2, __assign({ interactionKind: Popover2InteractionKind.HOVER_TARGET_ONLY, modifiers: {
                    arrow: {
                        enabled: !_this.props.minimal,
                    },
                    offset: {
                        options: {
                            offset: [0, TOOLTIP_ARROW_SVG_SIZE / 2],
                        },
                    },
                } }, restProps, { autoFocus: false, canEscapeKeyClose: false, disabled: (_b = ctxState.forceDisabled) !== null && _b !== void 0 ? _b : disabled, enforceFocus: false, lazy: true, popoverClassName: classes, portalContainer: _this.props.portalContainer, ref: function (ref) { return (_this.popover = ref); } }), children));
        };
        return _this;
    }
    Tooltip2.prototype.render = function () {
        var _this = this;
        // if we have an ancestor Tooltip2Context, we should take its state into account in this render path,
        // it was likely created by a parent ContextMenu2
        return (React.createElement(Tooltip2Context.Consumer, null, function (_a) {
            var state = _a[0];
            return React.createElement(Tooltip2Provider, __assign({}, state), _this.renderPopover);
        }));
    };
    Tooltip2.prototype.reposition = function () {
        if (this.popover != null) {
            this.popover.reposition();
        }
    };
    Tooltip2.displayName = "".concat(DISPLAYNAME_PREFIX, ".Tooltip2");
    Tooltip2.defaultProps = {
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        minimal: false,
        transitionDuration: 100,
    };
    return Tooltip2;
}(React.PureComponent));
export { Tooltip2 };
//# sourceMappingURL=tooltip2.js.map