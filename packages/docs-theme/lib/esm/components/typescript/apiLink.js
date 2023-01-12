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
import * as React from "react";
import { DocumentationContextTypes } from "../../common/context";
/**
 * Renders a link to open a symbol in the API Browser.
 */
var ApiLink = /** @class */ (function (_super) {
    __extends(ApiLink, _super);
    function ApiLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (evt) {
            evt.preventDefault();
            _this.context.showApiDocs(_this.props.name);
        };
        return _this;
    }
    ApiLink.prototype.render = function () {
        var _a = this.props, className = _a.className, name = _a.name;
        return (React.createElement("a", { className: className, href: "#api/".concat(name), onClick: this.handleClick }, name));
    };
    ApiLink.contextTypes = DocumentationContextTypes;
    return ApiLink;
}(React.PureComponent));
export { ApiLink };
//# sourceMappingURL=apiLink.js.map