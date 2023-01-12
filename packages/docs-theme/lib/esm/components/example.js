/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
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
/**
 * Container for an example and its options.
 *
 * ```tsx
 * import { Example, ExampleProps } from "@blueprintjs/docs-theme";
 * // use ExampleProps as your props type,
 * // then spread it to <Example> below
 * export class MyExample extends React.PureComponent<ExampleProps, [your state]> {
 *     public render() {
 *         const options = (
 *             <>
 *                  --- render options here ---
 *             </>
 *         );
 *         return (
 *             <Example options={options} {...this.props}>
 *                 --- render examples here ---
 *             </Example>
 *         );
 *     }
 * ```
 */
var Example = /** @class */ (function (_super) {
    __extends(Example, _super);
    function Example() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasDelayedInitialRender = false;
        return _this;
    }
    Example.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, data = _a.data, forceUpdate = _a.forceUpdate, html = _a.html, id = _a.id, options = _a.options, showOptionsBelowExample = _a.showOptionsBelowExample, 
        // spread any additional props through to the root element,
        // to support decorators that expect DOM props.
        htmlProps = __rest(_a, ["children", "className", "data", "forceUpdate", "html", "id", "options", "showOptionsBelowExample"]);
        // `forceUpdate` -  Don't let any React nodes into the DOM until the
        // `requestAnimationFrame` delay has elapsed.
        if (forceUpdate && !this.hasDelayedInitialRender) {
            return null;
        }
        var classes = classNames("docs-example-frame", showOptionsBelowExample ? "docs-example-frame-column" : "docs-example-frame-row", className);
        var example = html == null ? (React.createElement("div", { className: "docs-example" }, children)) : (React.createElement("div", { className: "docs-example", dangerouslySetInnerHTML: { __html: html } }));
        return (React.createElement("div", __assign({ className: classes, "data-example-id": id }, htmlProps),
            example,
            options && React.createElement("div", { className: "docs-example-options" }, options)));
    };
    Example.prototype.componentDidMount = function () {
        var _this = this;
        // `forceUpdate` - The docs app suffers from a Flash of Unstyled Content
        // that causes components to mis-measure themselves on first render.
        // Delay initial render till the DOM loads with a requestAnimationFrame.
        if (this.props.forceUpdate) {
            requestAnimationFrame(function () {
                _this.hasDelayedInitialRender = true;
                _this.forceUpdate();
            });
        }
    };
    Example.defaultProps = {
        forceUpdate: true,
        showOptionsBelowExample: false,
    };
    return Example;
}(React.PureComponent));
export { Example };
//# sourceMappingURL=example.js.map