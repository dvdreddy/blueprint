"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAliasTable = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var context_1 = require("../../common/context");
var apiHeader_1 = require("./apiHeader");
var TypeAliasTable = /** @class */ (function (_super) {
    tslib_1.__extends(TypeAliasTable, _super);
    function TypeAliasTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeAliasTable.prototype.render = function () {
        var data = this.props.data;
        var _a = this.context, renderBlock = _a.renderBlock, renderType = _a.renderType;
        var aliases = data.type.split(" | ").map(function (type, i) { return (React.createElement("div", { key: i },
            i === 0 ? "=" : "|",
            " ",
            renderType(type))); });
        return (React.createElement("div", { className: (0, classnames_1.default)("docs-modifiers", this.props.className) },
            React.createElement(apiHeader_1.ApiHeader, tslib_1.__assign({}, data)),
            renderBlock(data.documentation),
            React.createElement("div", { className: "docs-type-alias docs-code" }, aliases)));
    };
    TypeAliasTable.contextTypes = context_1.DocumentationContextTypes;
    TypeAliasTable.displayName = "Docs2.TypeAliasTable";
    return TypeAliasTable;
}(React.PureComponent));
exports.TypeAliasTable = TypeAliasTable;
//# sourceMappingURL=typeAliasTable.js.map