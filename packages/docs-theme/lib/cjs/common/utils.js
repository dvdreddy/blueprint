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
exports.eachLayoutNode = exports.createKeyEventHandler = exports.smartSearch = exports.dedent = void 0;
var tslib_1 = require("tslib");
var client_1 = require("@documentalist/client");
/**
 * Removes leading indents from a template string without removing all leading whitespace.
 * Trims resulting string to remove blank first/last lines caused by ` location.
 */
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var fullString = strings.reduce(function (accumulator, str, i) {
        return accumulator + values[i - 1].toString() + str;
    });
    // match all leading spaces/tabs at the start of each line
    var match = fullString.match(/^[ \t]*(?=\S)/gm);
    // find the smallest indent, we don't want to remove all leading whitespace
    var indent = Math.min.apply(Math, match.map(function (el) { return el.length; }));
    var regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString.trim();
}
exports.dedent = dedent;
function smartSearch(query) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    var terms = query.toLowerCase().split(" ");
    var dataToSearch = content.map(function (s) { return s.toLowerCase(); });
    return terms.every(function (term) { return dataToSearch.some(function (d) { return d.indexOf(term) >= 0; }); });
}
exports.smartSearch = smartSearch;
function createKeyEventHandler(actions, preventDefault) {
    if (preventDefault === void 0) { preventDefault = false; }
    return function (e) {
        var _a;
        for (var _i = 0, _b = Object.keys(actions); _i < _b.length; _i++) {
            var k = _b[_i];
            var key = Number(k);
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            // eslint-disable-next-line deprecation/deprecation
            if (e.which === key) {
                if (preventDefault) {
                    e.preventDefault();
                }
                actions[key](e);
            }
        }
        (_a = actions.all) === null || _a === void 0 ? void 0 : _a.call(actions, e);
    };
}
exports.createKeyEventHandler = createKeyEventHandler;
/**
 * Performs an in-order traversal of the layout tree, invoking the callback for each node.
 * Callback receives an array of ancestors with direct parent first in the list.
 */
function eachLayoutNode(layout, callback, parents) {
    if (parents === void 0) { parents = []; }
    layout.forEach(function (node) {
        callback(node, parents);
        if ((0, client_1.isPageNode)(node)) {
            eachLayoutNode(node.children, callback, tslib_1.__spreadArray([node], parents, true));
        }
    });
}
exports.eachLayoutNode = eachLayoutNode;
//# sourceMappingURL=utils.js.map