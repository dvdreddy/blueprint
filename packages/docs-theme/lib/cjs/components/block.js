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
exports.renderBlock = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
function renderBlock(
/** the block to render */
block, 
/** known tag renderers */
tagRenderers, 
/** class names to apply to element wrapping string content. */
textClassName) {
    if (block === undefined) {
        return null;
    }
    var textClasses = (0, classnames_1.default)(core_1.Classes.RUNNING_TEXT, textClassName);
    var contents = block.contents.map(function (node, i) {
        if (typeof node === "string") {
            return React.createElement("div", { className: textClasses, key: i, dangerouslySetInnerHTML: { __html: node } });
        }
        try {
            var renderer = tagRenderers[node.tag];
            if (renderer === undefined) {
                throw new Error("Unknown @tag: ".concat(node.tag));
            }
            return React.createElement(renderer, tslib_1.__assign(tslib_1.__assign({}, node), { key: i }));
        }
        catch (ex) {
            console.error(ex.message);
            return (React.createElement(core_1.H3, { key: "__error-".concat(i) },
                React.createElement(core_1.Code, null, ex.message)));
        }
    });
    return React.createElement("div", { className: "docs-section" }, contents);
}
exports.renderBlock = renderBlock;
//# sourceMappingURL=block.js.map