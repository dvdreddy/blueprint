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
import { ModifierTable } from "../modifierTable";
import { ApiHeader } from "./apiHeader";
import { DeprecatedTag } from "./deprecatedTag";
var EnumTable = /** @class */ (function (_super) {
    __extends(EnumTable, _super);
    function EnumTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderPropRow = function (entry) {
            // this is inside RUNNING_TEXT
            /* eslint-disable @blueprintjs/html-components */
            var renderBlock = _this.context.renderBlock;
            var _a = entry.flags, isDeprecated = _a.isDeprecated, isExternal = _a.isExternal, name = entry.name;
            var classes = classNames("docs-prop-name", {
                "docs-prop-is-deprecated": !!isDeprecated,
                "docs-prop-is-internal": !isExternal,
            });
            return (React.createElement("tr", { key: name },
                React.createElement("td", { className: classes },
                    React.createElement("code", null, name)),
                React.createElement("td", { className: "docs-prop-details" },
                    React.createElement("code", { className: "docs-prop-type" },
                        React.createElement("strong", null, entry.defaultValue)),
                    React.createElement("div", { className: "docs-prop-description" }, renderBlock(entry.documentation)),
                    React.createElement("div", { className: "docs-prop-tags" }, _this.renderTags(entry)))));
        };
        return _this;
    }
    EnumTable.prototype.render = function () {
        var data = this.props.data;
        var renderBlock = this.context.renderBlock;
        return (React.createElement("div", { className: classNames("docs-modifiers", this.props.className) },
            React.createElement(ApiHeader, __assign({}, data)),
            renderBlock(data.documentation),
            React.createElement(ModifierTable, { emptyMessage: "This enum is empty.", title: "Members" }, data.members.map(this.renderPropRow))));
    };
    EnumTable.prototype.renderTags = function (entry) {
        var isDeprecated = entry.flags.isDeprecated;
        return React.createElement(DeprecatedTag, { isDeprecated: isDeprecated });
    };
    EnumTable.contextTypes = DocumentationContextTypes;
    EnumTable.displayName = "Docs2.EnumTable";
    return EnumTable;
}(React.PureComponent));
export { EnumTable };
//# sourceMappingURL=enumTable.js.map