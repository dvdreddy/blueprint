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
import { filter } from "fuzzaldrin-plus";
import * as React from "react";
import { Classes, Icon, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import { eachLayoutNode } from "../common/utils";
var Navigator = /** @class */ (function (_super) {
    __extends(Navigator, _super);
    function Navigator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterMatches = function (query, items) {
            return filter(items, query, {
                key: "route",
                maxInners: items.length / 5,
                maxResults: 10,
                pathSeparator: "/",
                usePathScoring: true,
            });
        };
        _this.renderItem = function (section, props) {
            if (!props.modifiers.matchesPredicate) {
                return null;
            }
            // insert caret-right between each path element
            var pathElements = section.path.reduce(function (elems, el) {
                elems.push(el, React.createElement(Icon, { key: el, icon: "caret-right" }));
                return elems;
            }, []);
            pathElements.pop();
            var text = (React.createElement(React.Fragment, null,
                React.createElement("div", null, section.title),
                React.createElement("small", { className: Classes.TEXT_MUTED }, pathElements)));
            return (React.createElement(MenuItem, { active: props.modifiers.active, href: "#".concat(section.route), key: section.route, multiline: true, onClick: props.handleClick, onFocus: props.handleFocus, roleStructure: "listoption", text: text }));
        };
        // updating location.hash will trigger hashchange event, which Documentation will receive and use to navigate.
        _this.handleItemSelect = function (item) {
            location.hash = item.route;
            _this.props.onClose();
        };
        return _this;
    }
    Navigator.prototype.componentDidMount = function () {
        var _this = this;
        this.sections = [];
        eachLayoutNode(this.props.items, function (node, parents) {
            var _a, _b;
            if (((_b = (_a = _this.props).itemExclude) === null || _b === void 0 ? void 0 : _b.call(_a, node)) === true) {
                // ignore excluded item
                return;
            }
            var route = node.route, title = node.title;
            var path = parents.map(function (p) { return p.title; }).reverse();
            _this.sections.push({ path: path, route: route, title: title });
        });
    };
    Navigator.prototype.render = function () {
        if (!this.sections) {
            return null;
        }
        return (React.createElement(Omnibar, { className: "docs-navigator-menu", inputProps: { placeholder: "Search documentation pages and sections..." }, itemListPredicate: this.filterMatches, isOpen: this.props.isOpen, items: this.sections, itemRenderer: this.renderItem, onItemSelect: this.handleItemSelect, onClose: this.props.onClose, resetOnSelect: true }));
    };
    return Navigator;
}(React.PureComponent));
export { Navigator };
//# sourceMappingURL=navigator.js.map