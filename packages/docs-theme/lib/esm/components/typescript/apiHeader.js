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
import { isTsClass, isTsInterface } from "@documentalist/client";
import * as React from "react";
import { DocumentationContextTypes } from "../../common/context";
var ApiHeader = /** @class */ (function (_super) {
    __extends(ApiHeader, _super);
    function ApiHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApiHeader.prototype.render = function () {
        return (React.createElement("div", { className: "docs-interface-header" },
            React.createElement("div", { className: "docs-interface-name" },
                React.createElement("small", null, this.props.kind),
                " ",
                this.props.name,
                " ",
                React.createElement("small", null, this.renderInheritance())),
            React.createElement("small", { className: "docs-package-name" },
                React.createElement("a", { href: this.props.sourceUrl, target: "_blank" }, this.context.renderViewSourceLinkText(this.props))),
            this.props.children));
    };
    ApiHeader.prototype.renderInheritance = function () {
        if (isTsClass(this.props) || isTsInterface(this.props)) {
            var extendsTypes = maybeJoinArray("extends", this.props.extends);
            var implementsTypes = maybeJoinArray("implements", this.props.implements);
            return this.context.renderType("".concat(extendsTypes, " ").concat(implementsTypes));
        }
        return "";
    };
    ApiHeader.contextTypes = DocumentationContextTypes;
    ApiHeader.displayName = "Docs2.ApiHeader";
    return ApiHeader;
}(React.PureComponent));
export { ApiHeader };
function maybeJoinArray(title, array) {
    if (array == null || array.length === 0) {
        return "";
    }
    return "".concat(title, " ").concat(array.join(", "));
}
//# sourceMappingURL=apiHeader.js.map