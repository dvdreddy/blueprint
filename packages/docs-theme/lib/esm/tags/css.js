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
import { __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Checkbox, Classes, Code } from "@blueprintjs/core";
import { DocumentationContextTypes } from "../common/context";
import { Example } from "../components/example";
var CssExample = /** @class */ (function (_super) {
    __extends(CssExample, _super);
    function CssExample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { modifiers: new Set() };
        return _this;
    }
    CssExample.prototype.render = function () {
        var _this = this;
        var _a;
        var value = this.props.value;
        var css = ((_a = this.context) === null || _a === void 0 ? void 0 : _a.getDocsData()).css;
        if (css == null || css[value] == null) {
            return null;
        }
        var _b = css[value], markup = _b.markup, markupHtml = _b.markupHtml, modifiers = _b.modifiers, reference = _b.reference;
        var options = modifiers.map(function (modifier) { return (React.createElement(Checkbox, { key: modifier.name, checked: _this.state.modifiers.has(modifier.name), onChange: _this.getModifierToggleHandler(modifier.name) },
            React.createElement(Code, { "data-modifier": modifier.name }, modifier.name),
            React.createElement("div", { className: "docs-prop-description", dangerouslySetInnerHTML: { __html: modifier.documentation } }))); });
        return (React.createElement(React.Fragment, null,
            React.createElement(Example, { id: reference, options: options.length > 0 ? options : false, html: this.renderExample(markup) }),
            React.createElement("div", { className: classNames("docs-example-markup", Classes.RUNNING_TEXT), dangerouslySetInnerHTML: { __html: markupHtml } })));
    };
    CssExample.prototype.getModifierToggleHandler = function (modifier) {
        var _this = this;
        return function () {
            var modifiers = new Set(_this.state.modifiers);
            if (modifiers.has(modifier)) {
                modifiers.delete(modifier);
            }
            else {
                modifiers.add(modifier);
            }
            _this.setState({ modifiers: modifiers });
        };
    };
    CssExample.prototype.renderExample = function (markup) {
        var classes = this.getModifiers(".");
        var attrs = this.getModifiers(":");
        return markup.replace(MODIFIER_ATTR_REGEXP, attrs).replace(MODIFIER_CLASS_REGEXP, classes);
    };
    CssExample.prototype.getModifiers = function (prefix) {
        return Array.from(this.state.modifiers.keys())
            .filter(function (mod) { return mod.charAt(0) === prefix; })
            .map(function (mod) { return mod.slice(1); })
            .join(" ");
    };
    CssExample.contextTypes = DocumentationContextTypes;
    CssExample.displayName = "Docs2.CssExample";
    return CssExample;
}(React.PureComponent));
export { CssExample };
var MODIFIER_ATTR_REGEXP = /\{\{:modifier}}/g;
var MODIFIER_CLASS_REGEXP = /\{\{\.modifier}}/g;
//# sourceMappingURL=css.js.map