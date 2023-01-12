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
exports.NavMenu = void 0;
var tslib_1 = require("tslib");
var client_1 = require("@documentalist/client");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var navMenuItem_1 = require("./navMenuItem");
var NavMenu = function (props) {
    var _a = props.renderNavMenuItem, renderNavMenuItem = _a === void 0 ? navMenuItem_1.NavMenuItem : _a;
    var menu = props.items.map(function (section) {
        var _a;
        var isActive = props.activeSectionId === section.route;
        var isExpanded = isActive || isParentOfRoute(section.route, props.activeSectionId);
        // active section gets selected styles, expanded section shows its children
        var itemClasses = (0, classnames_1.default)("depth-".concat(section.level - props.level - 1), (_a = {
                "docs-nav-expanded": isExpanded
            },
            _a[core_1.Classes.ACTIVE] = isActive,
            _a));
        var item = renderNavMenuItem({
            className: itemClasses,
            href: "#" + section.route,
            isActive: isActive,
            isExpanded: isExpanded,
            onClick: function () { return props.onItemClick(section.route); },
            section: section,
        });
        return (React.createElement("li", { key: section.route },
            item,
            (0, client_1.isPageNode)(section) ? React.createElement(exports.NavMenu, tslib_1.__assign({}, props, { level: section.level, items: section.children })) : null));
    });
    var classes = (0, classnames_1.default)("docs-nav-menu", core_1.Classes.LIST_UNSTYLED, props.className);
    return React.createElement("ul", { className: classes }, menu);
};
exports.NavMenu = NavMenu;
exports.NavMenu.displayName = "Docs2.NavMenu";
function isParentOfRoute(parent, route) {
    return route.indexOf(parent + "/") === 0 || route.indexOf(parent + ".") === 0;
}
//# sourceMappingURL=navMenu.js.map