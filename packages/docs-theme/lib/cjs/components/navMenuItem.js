"use strict";
/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
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
exports.NavMenuItem = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var NavMenuItem = function (props) {
    var className = props.className, isActive = props.isActive, isExpanded = props.isExpanded, section = props.section, htmlProps = tslib_1.__rest(props, ["className", "isActive", "isExpanded", "section"]);
    return (React.createElement("a", tslib_1.__assign({ className: (0, classnames_1.default)(core_1.Classes.MENU_ITEM, className) }, htmlProps),
        React.createElement("span", null, section.title),
        props.children));
};
exports.NavMenuItem = NavMenuItem;
exports.NavMenuItem.displayName = "Docs2.NavMenuItem";
//# sourceMappingURL=navMenuItem.js.map