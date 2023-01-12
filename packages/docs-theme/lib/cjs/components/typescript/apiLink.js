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
exports.ApiLink = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var context_1 = require("../../common/context");
/**
 * Renders a link to open a symbol in the API Browser.
 */
var ApiLink = /** @class */ (function (_super) {
    tslib_1.__extends(ApiLink, _super);
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
    ApiLink.contextTypes = context_1.DocumentationContextTypes;
    return ApiLink;
}(React.PureComponent));
exports.ApiLink = ApiLink;
//# sourceMappingURL=apiLink.js.map