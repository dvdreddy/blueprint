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
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = tslib_1.__importStar(require("tslint"));
var ts = tslib_1.__importStar(require("typescript"));
var addImportToFile_1 = require("./utils/addImportToFile");
var replaceTagName_1 = require("./utils/replaceTagName");
var PATTERN = /^(h[1-6]|code|pre|blockquote|table)$/;
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.getFailure = function (componentName) {
        return "use Blueprint <".concat(componentName, "> component instead of JSX intrinsic element.");
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        ruleName: "blueprint-html-components",
        // tslint:disable-next-line:object-literal-sort-keys
        description: "Enforce usage of Blueprint components over JSX intrinsic elements.",
        options: null,
        optionsDescription: "Not configurable",
        optionExamples: ["true"],
        type: "style",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var tagFailures = [];
    // walk file and build up array of failures
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
            var match = PATTERN.exec(node.tagName.getFullText());
            if (match != null) {
                var newTagName = getNewTagName(match[1]);
                var replacements = [(0, replaceTagName_1.replaceTagName)(node.tagName, newTagName)];
                if (ts.isJsxOpeningElement(node)) {
                    // find closing tag after this opening tag to replace both in one failure
                    var closingNode = node.parent.getChildren().filter(ts.isJsxClosingElement)[0];
                    replacements.push((0, replaceTagName_1.replaceTagName)(closingNode.tagName, newTagName));
                }
                tagFailures.push({ jsxTag: node.tagName, newTagName: newTagName, replacements: replacements });
            }
        }
        return ts.forEachChild(node, cb);
    });
    if (tagFailures.length === 0) {
        return;
    }
    // collect all potential new imports into one replacement (in first failure), after processing entire file.
    var importsToAdd = (0, addImportToFile_1.addImportToFile)(ctx.sourceFile, tagFailures.map(function (m) { return m.newTagName; }), "@blueprintjs/core");
    tagFailures[0].replacements.push(importsToAdd);
    // add all failures at the end
    tagFailures.forEach(function (_a) {
        var jsxTag = _a.jsxTag, newTagName = _a.newTagName, replacements = _a.replacements;
        return ctx.addFailureAt(jsxTag.getFullStart(), jsxTag.getFullWidth(), Rule.getFailure(newTagName), replacements);
    });
}
function getNewTagName(tagName) {
    switch (tagName) {
        case "table":
            return "HTMLTable";
        default:
            return tagName.charAt(0).toUpperCase() + tagName.slice(1);
    }
}
//# sourceMappingURL=blueprintHtmlComponentsRule.js.map