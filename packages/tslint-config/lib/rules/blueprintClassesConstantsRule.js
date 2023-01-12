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
var _2_8_1 = require("tsutils/typeguard/2.8");
var ts = tslib_1.__importStar(require("typescript"));
var addImportToFile_1 = require("./utils/addImportToFile");
// find all pt- prefixed classes, except those that begin with pt-icon (handled by other rules).
// currently support pt- and bp3- prefixes.
var BLUEPRINT_CLASSNAME_PATTERN = /[^\w-<.]((pt|bp3)-(?!icon-?)[\w-]+)/g;
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        ruleName: "blueprint-classes-constants",
        // tslint:disable-next-line:object-literal-sort-keys
        description: "Enforce usage of Classes constants over namespaced string literals.",
        options: null,
        optionsDescription: "Not configurable",
        optionExamples: ["true"],
        type: "style",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = "use Blueprint `Classes` constant instead of string literal";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var shouldFixImports = true;
    return ts.forEachChild(ctx.sourceFile, callback);
    function callback(node) {
        if (ts.isStringLiteralLike(node) || ts.isTemplateExpression(node)) {
            var prefixMatches = getAllMatches(node.getFullText());
            if (prefixMatches.length > 0) {
                var ptClassStrings = prefixMatches.map(function (m) { return m.match; });
                var replacementText = (0, _2_8_1.isStringLiteral)(node)
                    ? // "string literal" likely becomes `${template} string` so we may need to change how it is assigned
                        wrapForParent(getLiteralReplacement(node.getText(), ptClassStrings), node)
                    : getTemplateReplacement(node.getText(), ptClassStrings);
                var replacements = [new Lint.Replacement(node.getStart(), node.getWidth(), replacementText)];
                if (shouldFixImports) {
                    // add an import statement for `Classes` constants at most once.
                    replacements.unshift((0, addImportToFile_1.addImportToFile)(ctx.sourceFile, ["Classes"], "@blueprintjs/core"));
                    shouldFixImports = false;
                }
                ctx.addFailureAt(node.getFullStart() + prefixMatches[0].index + 1, prefixMatches[0].match.length, Rule.FAILURE_STRING, replacements);
            }
        }
        return ts.forEachChild(node, callback);
    }
}
/** Returns array of all invalid string matches detected in the given className string. */
function getAllMatches(className) {
    var ptMatches = [];
    var currentMatch;
    while ((currentMatch = BLUEPRINT_CLASSNAME_PATTERN.exec(className)) != null) {
        ptMatches.push({ match: currentMatch[1], index: currentMatch.index || 0 });
    }
    return ptMatches;
}
/** Produce replacement text for a string literal that contains invalid classes. */
function getLiteralReplacement(className, ptClassStrings) {
    // remove all illegal classnames, then slice off the quotes, then merge & trim any remaining white space
    var stringWithoutPtClasses = ptClassStrings
        .reduce(function (value, cssClass) { return value.replace(cssClass, ""); }, className)
        .slice(1, -1)
        .replace(/(\s)+/, "$1")
        .trim();
    // special case: only one invalid class name
    if (stringWithoutPtClasses.length === 0 && ptClassStrings.length === 1) {
        return convertPtClassName(ptClassStrings[0]);
    }
    // otherwise produce a `template string`
    var templateStrings = ptClassStrings.map(function (n) { return "${".concat(convertPtClassName(n), "}"); }).join(" ");
    return "`".concat([templateStrings, stringWithoutPtClasses].join(" ").trim(), "`");
}
/** Produce replacement text for a `template string` that contains invalid classes. */
function getTemplateReplacement(className, ptClassStrings) {
    return ptClassStrings.reduce(function (value, cssClass) { return value.replace(cssClass, "${".concat(convertPtClassName(cssClass), "}")); }, className);
}
/** Wrap the given statement based on the type of the parent node: JSX props, expressions, etc. */
function wrapForParent(statement, node) {
    var parent = node.parent;
    if (parent === undefined) {
        return statement;
    }
    else if ((0, _2_8_1.isJsxAttribute)(parent)) {
        return "{".concat(statement, "}");
    }
    else if ((0, _2_8_1.isExpressionStatement)(parent)) {
        return "[".concat(statement, "]");
        // If we're changing the key, it will be child index 0 and we need to wrap it.
        // Else, we're changing a value, and there's no need to wrap
    }
    else if ((0, _2_8_1.isPropertyAssignment)(parent) && parent.getChildAt(0) === node) {
        return "[".concat(statement, "]");
    }
    else {
        return statement;
    }
}
/** Converts a `pt-class-name` literal to `Classes.CLASS_NAME` constant. */
function convertPtClassName(text) {
    var className = text
        .replace(/(pt|bp3)-/, "")
        .replace(/-/g, "_")
        .toUpperCase();
    return "Classes.".concat(className);
}
//# sourceMappingURL=blueprintClassesConstantsRule.js.map