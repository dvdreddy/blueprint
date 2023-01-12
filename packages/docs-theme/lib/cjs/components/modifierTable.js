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
exports.ModifierTable = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var ModifierTable = function (_a) {
    var children = _a.children, _b = _a.descriptionTitle, descriptionTitle = _b === void 0 ? "Description" : _b, emptyMessage = _a.emptyMessage, title = _a.title;
    return (React.createElement("div", { className: (0, classnames_1.default)("docs-modifiers-table", core_1.Classes.RUNNING_TEXT) },
        React.createElement(core_1.HTMLTable, null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, title),
                    React.createElement("th", null, descriptionTitle))),
            React.createElement("tbody", null, isEmpty(children) ? renderEmptyState(emptyMessage) : children))));
};
exports.ModifierTable = ModifierTable;
function isEmpty(children) {
    var array = React.Children.toArray(children);
    return array.length === 0 || array.filter(function (item) { return !!item; }).length === 0;
}
function renderEmptyState(message) {
    if (message === void 0) { message = "Nothing here."; }
    return (React.createElement("tr", null,
        React.createElement("td", { colSpan: 2 },
            React.createElement("em", { className: core_1.Classes.TEXT_MUTED }, message))));
}
//# sourceMappingURL=modifierTable.js.map