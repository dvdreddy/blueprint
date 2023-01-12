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
import { __assign, __extends, __spreadArray } from "tslib";
import { isTag, isTsProperty, } from "@documentalist/client";
import classNames from "classnames";
import * as React from "react";
import { Classes, Intent, Tag } from "@blueprintjs/core";
import { DocumentationContextTypes } from "../../common/context";
import { ModifierTable } from "../modifierTable";
import { ApiHeader } from "./apiHeader";
import { DeprecatedTag } from "./deprecatedTag";
// rendered inside RUNNING_TEXT
/* eslint-disable @blueprintjs/html-components */
var InterfaceTable = /** @class */ (function (_super) {
    __extends(InterfaceTable, _super);
    function InterfaceTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderPropRow = function (entry) {
            var _a = _this.context, renderBlock = _a.renderBlock, renderType = _a.renderType;
            var _b = entry.flags, isDeprecated = _b.isDeprecated, isExternal = _b.isExternal, isOptional = _b.isOptional, name = entry.name;
            var documentation = (isTsProperty(entry) ? entry : entry.signatures[0]).documentation;
            // ignore props marked with `@internal` tag (this tag is in contents instead of in flags)
            if (documentation != null &&
                documentation.contents != null &&
                documentation.contents.some(function (val) { return isTag(val) && val.tag === "internal"; })) {
                return null;
            }
            var classes = classNames("docs-prop-name", {
                "docs-prop-is-deprecated": isDeprecated === true || typeof isDeprecated === "string",
                "docs-prop-is-internal": !isExternal,
                "docs-prop-is-required": !isOptional,
            });
            var typeInfo = isTsProperty(entry) ? (React.createElement(React.Fragment, null,
                React.createElement("strong", null, renderType(entry.type)),
                React.createElement("em", { className: classNames("docs-prop-default", Classes.TEXT_MUTED) }, entry.defaultValue))) : (React.createElement(React.Fragment, null,
                React.createElement("strong", null, renderType(entry.signatures[0].type))));
            return (React.createElement("tr", { key: name },
                React.createElement("td", { className: classes },
                    React.createElement("code", null, name)),
                React.createElement("td", { className: "docs-prop-details" },
                    React.createElement("code", { className: "docs-prop-type" }, typeInfo),
                    React.createElement("div", { className: "docs-prop-description" }, renderBlock(documentation)),
                    React.createElement("div", { className: "docs-prop-tags" }, _this.renderTags(entry)))));
        };
        return _this;
    }
    InterfaceTable.prototype.render = function () {
        var _a = this.props, data = _a.data, title = _a.title;
        var renderBlock = this.context.renderBlock;
        var propRows = __spreadArray(__spreadArray([], data.properties, true), data.methods, true).sort(function (a, b) { return a.name.localeCompare(b.name); })
            .map(this.renderPropRow);
        return (React.createElement("div", { className: classNames("docs-modifiers", this.props.className) },
            React.createElement(ApiHeader, __assign({}, data)),
            renderBlock(data.documentation),
            React.createElement(ModifierTable, { emptyMessage: "This interface is empty.", title: title },
                propRows,
                this.renderIndexSignature(data.indexSignature))));
    };
    InterfaceTable.prototype.renderIndexSignature = function (entry) {
        if (entry == null) {
            return null;
        }
        var _a = this.context, renderBlock = _a.renderBlock, renderType = _a.renderType;
        // HACKHACK: Documentalist's indexSignature support isn't _great_, but it's certainly _good enough_
        // entry.type looks like "{ [name: string]: (date: Date) => boolean }"
        var _b = entry.type.slice(2, -2).split("]: "), signature = _b[0], returnType = _b[1];
        return (React.createElement("tr", { key: entry.name },
            React.createElement("td", { className: "docs-prop-name" },
                React.createElement("code", null,
                    renderType(signature),
                    "]")),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement("code", { className: "docs-prop-type" }, renderType(returnType)),
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(entry.documentation)))));
    };
    InterfaceTable.prototype.renderTags = function (entry) {
        var renderType = this.context.renderType;
        var _a = entry.flags, isDeprecated = _a.isDeprecated, isOptional = _a.isOptional, inheritedFrom = entry.inheritedFrom;
        return (React.createElement(React.Fragment, null,
            !isOptional && React.createElement(Tag, { children: "Required", intent: Intent.SUCCESS, minimal: true }),
            React.createElement(DeprecatedTag, { isDeprecated: isDeprecated }),
            inheritedFrom && (React.createElement(Tag, { minimal: true },
                "Inherited from ",
                React.createElement("code", null, renderType(inheritedFrom))))));
    };
    InterfaceTable.contextTypes = DocumentationContextTypes;
    InterfaceTable.displayName = "Docs2.InterfaceTable";
    return InterfaceTable;
}(React.PureComponent));
export { InterfaceTable };
//# sourceMappingURL=interfaceTable.js.map