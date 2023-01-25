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
exports.classesConstantsRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const addImportToFile_1 = require("./utils/addImportToFile");
const createRule_1 = require("./utils/createRule");
const fixList_1 = require("./utils/fixList");
const getProgram_1 = require("./utils/getProgram");
// find all pt- prefixed classes, except those that begin with pt-icon (handled by other rules).
// currently support "pt-", "bp3-", "bp4-" prefixes.
const BLUEPRINT_CLASSNAME_PATTERN = /(?<![\w])((?:pt|bp3|bp4)-(?!icon)[\w-]+)/g;
// tslint:disable object-literal-sort-keys
exports.classesConstantsRule = (0, createRule_1.createRule)({
    name: "classes-constants",
    meta: {
        docs: {
            description: "Enforce usage of Classes constants over namespaced string literals.",
            recommended: "error",
            requiresTypeChecking: false,
        },
        fixable: "code",
        messages: {
            useBlueprintClasses: "use Blueprint `Classes` constant instead of string literal",
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],
    create: context => ({
        "Literal, TemplateElement": node => create(context, node),
    }),
});
function create(context, node) {
    var _a, _b;
    // We shouldn't lint on strings from imports/exports
    if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ImportDeclaration ||
        ((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.ExportNamedDeclaration) {
        return;
    }
    const nodeValue = node.type === utils_1.AST_NODE_TYPES.Literal ? node.raw : node.value.raw;
    const prefixMatches = getAllMatches(nodeValue);
    if (prefixMatches.length > 0) {
        const ptClassStrings = prefixMatches.map(m => m.match);
        const replacementText = node.type === utils_1.AST_NODE_TYPES.Literal
            ? // "string literal" likely becomes `${template} string` so we may need to change how it is assigned
                wrapForParent(getLiteralReplacement(nodeValue, prefixMatches), node)
            : getTemplateReplacement(nodeValue, ptClassStrings);
        context.report({
            messageId: "useBlueprintClasses",
            node,
            fix: fixer => {
                const fixes = new fixList_1.FixList();
                fixes.addFixes(fixer.replaceText(node, replacementText));
                // Add import for the Classes enum
                const program = (0, getProgram_1.getProgram)(node);
                if (program !== undefined) {
                    fixes.addFixes((0, addImportToFile_1.addImportToFile)(program, ["Classes"], "@blueprintjs/core")(fixer));
                }
                return fixes.getFixes();
            },
        });
    }
}
function getAllMatches(className) {
    const ptMatches = [];
    let currentMatch;
    // eslint-disable-line no-cond-assign
    while ((currentMatch = BLUEPRINT_CLASSNAME_PATTERN.exec(className)) != null) {
        ptMatches.push({ match: currentMatch[1], index: currentMatch.index || 0 });
    }
    return ptMatches;
}
/** Produce replacement text for a string literal that contains invalid classes. */
function getLiteralReplacement(className, prefixMatches) {
    // Special case: the string consists entirely of the invalid class name (ignoring quotes/spaces)
    // In this scenario, we just want to return the converted classnames without surrounding with ${} for interpolation
    if (prefixMatches.length === 1) {
        const remainingString = className
            .replace(prefixMatches[0].match, "")
            .slice(1, -1)
            .replace(/(\s)+/, "$1")
            .trim();
        if (remainingString.length === 0) {
            return convertPtClassName(prefixMatches[0].match);
        }
    }
    // Start with the beginning of the string until the first match of an invalid classname
    let newString = "";
    let currentIndex = 0;
    for (const { match, index } of prefixMatches) {
        // Add the strings between the currentIndex and this invalid class name's index
        newString += className.slice(currentIndex, index);
        // Add the converted string instead of the original string
        newString += `\${${convertPtClassName(match)}}`;
        // Update the index to immediately after this invalid class name
        currentIndex = index + match.length;
    }
    // Add remaining parts of string that occurred after the last invalid class name
    newString += className.slice(currentIndex, className.length);
    // Slice off the quotes, and merge & trim any remaining white space
    newString = newString.slice(1, -1).replace(/(\s)+/, "$1").trim();
    // Surround with backticks instead for the newly added template strings
    return `\`${newString}\``;
}
/** Produce replacement text for a `template string` that contains invalid classes. */
function getTemplateReplacement(className, ptClassStrings) {
    const templateString = ptClassStrings.reduce((value, cssClass) => {
        return value === cssClass
            ? // if the class is the only contents, we can remove the template
                `${convertPtClassName(cssClass)}`
            : value.replace(cssClass, `\${${convertPtClassName(cssClass)}}`);
    }, className);
    // if the result has a template string inside of it, surround it with backticks
    return templateString.includes("${") ? `\`${templateString}\`` : templateString;
}
/** Wrap the given statement based on the type of the parent node: JSX props, expressions, etc. */
function wrapForParent(statement, node) {
    const { parent } = node;
    if (parent === undefined) {
        return statement;
    }
    else if (parent.type === utils_1.AST_NODE_TYPES.JSXAttribute) {
        return `{${statement}}`;
    }
    else if (parent.type === utils_1.AST_NODE_TYPES.ExpressionStatement) {
        return `[${statement}]`;
    }
    else {
        return statement;
    }
}
/** Converts a `pt-class-name` literal to `Classes.CLASS_NAME` constant. */
function convertPtClassName(text) {
    const className = text
        .replace(/(pt|bp3|bp4)-/, "")
        .replace(/-/g, "_")
        .toUpperCase();
    return `Classes.${className}`;
}
//# sourceMappingURL=classes-constants.js.map