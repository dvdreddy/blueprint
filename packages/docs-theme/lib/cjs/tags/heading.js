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
exports.Heading = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Heading = function (_a) {
    var level = _a.level, route = _a.route, value = _a.value;
    // use createElement so we can dynamically choose tag based on depth
    return React.createElement("h".concat(level), { className: (0, classnames_1.default)(core_1.Classes.HEADING, "docs-title") }, React.createElement("a", { className: "docs-anchor", "data-route": route, key: "anchor" }), React.createElement("a", { className: "docs-anchor-link", href: "#" + route, key: "link" },
        React.createElement(core_1.Icon, { icon: "link" })), value);
};
exports.Heading = Heading;
exports.Heading.displayName = "Docs2.Heading";
//# sourceMappingURL=heading.js.map