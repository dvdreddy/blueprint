"use strict";
/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodTable = void 0;
var tslib_1 = require("tslib");
var client_1 = require("@documentalist/client");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var context_1 = require("../../common/context");
var modifierTable_1 = require("../modifierTable");
var apiHeader_1 = require("./apiHeader");
var deprecatedTag_1 = require("./deprecatedTag");
var MethodTable = /** @class */ (function (_super) {
    tslib_1.__extends(MethodTable, _super);
    function MethodTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderPropRow = function (parameter) {
            var _a = _this.context, renderBlock = _a.renderBlock, renderType = _a.renderType;
            var _b = parameter.flags, isDeprecated = _b.isDeprecated, isExternal = _b.isExternal, isOptional = _b.isOptional, name = parameter.name;
            var documentation = parameter.documentation;
            // ignore props marked with `@internal` tag (this tag is in contents instead of in flags)
            if (documentation != null &&
                documentation.contents != null &&
                documentation.contents.some(function (val) { return (0, client_1.isTag)(val) && val.tag === "internal"; })) {
                return null;
            }
            var classes = (0, classnames_1.default)("docs-prop-name", {
                "docs-prop-is-deprecated": isDeprecated === true || typeof isDeprecated === "string",
                "docs-prop-is-internal": !isExternal,
                "docs-prop-is-required": !isOptional,
            });
            var typeInfo = (React.createElement(React.Fragment, null,
                React.createElement("strong", null, renderType(parameter.type))));
            return (React.createElement("tr", { key: name },
                React.createElement("td", { className: classes },
                    React.createElement(core_1.Code, null, name)),
                React.createElement("td", { className: "docs-prop-details" },
                    React.createElement(core_1.Code, { className: "docs-prop-type" }, typeInfo),
                    React.createElement("div", { className: "docs-prop-description" }, renderBlock(documentation)),
                    React.createElement("div", { className: "docs-prop-tags" }, _this.renderTags(parameter)))));
        };
        return _this;
    }
    MethodTable.prototype.render = function () {
        var _this = this;
        var data = this.props.data;
        var propRows = tslib_1.__spreadArray([], data.signatures, true).sort(function (a, b) { return a.name.localeCompare(b.name); })
            .map(function (entry) { return entry.parameters.map(function (parameter) { return _this.renderPropRow(parameter); }); });
        return (React.createElement("div", { className: (0, classnames_1.default)("docs-modifiers", this.props.className) },
            React.createElement(apiHeader_1.ApiHeader, tslib_1.__assign({}, data)),
            React.createElement(modifierTable_1.ModifierTable, { emptyMessage: "No return", title: "Returns", descriptionTitle: "" }, this.renderReturnSignature(data.signatures[0])),
            React.createElement(modifierTable_1.ModifierTable, { emptyMessage: "This parameter is empty.", title: "Parameters" }, propRows)));
    };
    MethodTable.prototype.renderTags = function (entry) {
        var _a = entry.flags, isDeprecated = _a.isDeprecated, isOptional = _a.isOptional;
        return (React.createElement(React.Fragment, null,
            !isOptional && React.createElement(core_1.Tag, { children: "Required", intent: core_1.Intent.SUCCESS, minimal: true }),
            React.createElement(deprecatedTag_1.DeprecatedTag, { isDeprecated: isDeprecated })));
    };
    MethodTable.prototype.renderReturnSignature = function (entry) {
        if (entry == null) {
            return null;
        }
        var _a = this.context, renderBlock = _a.renderBlock, renderType = _a.renderType;
        return (React.createElement("tr", { key: entry.name },
            React.createElement("td", { className: "docs-prop-name" },
                React.createElement(core_1.Code, { className: "docs-prop-type" }, renderType(entry.returnType))),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(entry.documentation)))));
    };
    MethodTable.contextTypes = context_1.DocumentationContextTypes;
    MethodTable.displayName = "Docs2.MethodTable";
    return MethodTable;
}(React.PureComponent));
exports.MethodTable = MethodTable;
//# sourceMappingURL=methodTable.js.map