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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { DocumentationContextTypes } from "../../common/context";
import { ApiHeader } from "./apiHeader";
var TypeAliasTable = /** @class */ (function (_super) {
    __extends(TypeAliasTable, _super);
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
        return (React.createElement("div", { className: classNames("docs-modifiers", this.props.className) },
            React.createElement(ApiHeader, __assign({}, data)),
            renderBlock(data.documentation),
            React.createElement("div", { className: "docs-type-alias docs-code" }, aliases)));
    };
    TypeAliasTable.contextTypes = DocumentationContextTypes;
    TypeAliasTable.displayName = "Docs2.TypeAliasTable";
    return TypeAliasTable;
}(React.PureComponent));
export { TypeAliasTable };
//# sourceMappingURL=typeAliasTable.js.map