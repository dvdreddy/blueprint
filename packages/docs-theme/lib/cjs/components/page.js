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
exports.Page = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var block_1 = require("./block");
var Page = function (_a) {
    var page = _a.page, renderActions = _a.renderActions, tagRenderers = _a.tagRenderers;
    // apply running text styles to blocks in pages (but not on blocks in examples)
    var pageContents = (0, block_1.renderBlock)(page, tagRenderers, core_1.Classes.TEXT_LARGE);
    return (React.createElement("div", { className: "docs-page", "data-page-id": page.route },
        renderActions && React.createElement("div", { className: "docs-page-actions" }, renderActions(page)),
        pageContents));
};
exports.Page = Page;
//# sourceMappingURL=page.js.map