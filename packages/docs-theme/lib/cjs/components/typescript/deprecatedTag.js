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
exports.DeprecatedTag = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var DeprecatedTag = function (_a) {
    var isDeprecated = _a.isDeprecated;
    if (isDeprecated === true || typeof isDeprecated === "string") {
        return (React.createElement(core_1.Tag, { intent: core_1.Intent.DANGER, minimal: true }, typeof isDeprecated === "string" ? (React.createElement("span", { dangerouslySetInnerHTML: markdownCode("Deprecated: ".concat(isDeprecated)) })) : ("Deprecated")));
    }
    return null;
};
exports.DeprecatedTag = DeprecatedTag;
exports.DeprecatedTag.displayName = "Docs2.DeprecatedTag";
/**
 * Minimal markdown renderer that supports only backtick `code` elements and triple-backtick `pre` elements.
 * Does not provide any syntax highlighting.
 */
function markdownCode(text) {
    return {
        __html: text
            .replace("<", "&lt;")
            .replace(/```([^`]+)```/g, function (_, code) { return "<pre>".concat(code, "</pre>"); })
            .replace(/`([^`]+)`/g, function (_, code) { return "<code>".concat(code, "</code>"); }),
    };
}
//# sourceMappingURL=deprecatedTag.js.map