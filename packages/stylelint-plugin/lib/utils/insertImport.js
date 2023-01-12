"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
exports.insertImport = void 0;
const tslib_1 = require("tslib");
const postcss_1 = tslib_1.__importDefault(require("postcss"));
const cssSyntax_1 = require("./cssSyntax");
/**
 * Adds an import statement to the file. The import is inserted below the existing imports, and if there are
 * no imports present then it's inserted at the top of the file (but below any copyright headers).
 */
function insertImport(cssSyntaxType, root, context, importPath, namespace) {
    var _a, _b, _c, _d;
    const newline = context.newline || "\n";
    const ruleOrComment = getLastImport(cssSyntaxType, root) || getCopyrightHeader(root);
    let importOrUse = "import";
    let params = `"${importPath}"`;
    if (cssSyntaxType === cssSyntax_1.CssSyntax.SASS) {
        importOrUse = "use";
        if (namespace !== undefined) {
            params += ` as ${namespace}`;
        }
    }
    if (ruleOrComment != null) {
        const importNode = postcss_1.default.atRule({
            name: importOrUse,
            params,
            raws: {
                afterName: " ",
                before: ruleOrComment.type === "comment" ? `${newline}${newline}` : newline,
                semicolon: true,
            },
        });
        root.insertAfter(ruleOrComment, importNode);
    }
    else {
        const importNode = postcss_1.default.atRule({
            name: importOrUse,
            params,
            raws: {
                afterName: " ",
                before: "",
                semicolon: true,
            },
        });
        root.prepend(importNode);
        // Make sure there are at least two newlines before the next child
        const nextChild = (_a = root.nodes) === null || _a === void 0 ? void 0 : _a[1];
        if (nextChild != null) {
            const nExistingNewlines = (_d = (_c = (_b = nextChild.raws.before) === null || _b === void 0 ? void 0 : _b.split("")) === null || _c === void 0 ? void 0 : _c.filter(char => char === newline).length) !== null && _d !== void 0 ? _d : 0;
            nextChild.raws.before = `${newline.repeat(Math.max(0, 2 - nExistingNewlines))}${nextChild.raws.before || ""}`;
        }
    }
}
exports.insertImport = insertImport;
/**
 * Returns the last import node in the file, or undefined if one does not exist
 */
function getLastImport(cssSyntaxType, root) {
    let lastImport;
    const walkRegex = cssSyntaxType === cssSyntax_1.CssSyntax.LESS ? /^import$/i : /^use$/i;
    root.walkAtRules(walkRegex, atRule => {
        lastImport = atRule;
    });
    return lastImport;
}
/**
 * Returns the first copyright header in the file, or undefined if one does not exist.
 * If the first copyright header spans multiple lines, the last line is returned.
 */
function getCopyrightHeader(root) {
    let lastCopyrightComment;
    root.walkComments(comment => {
        var _a, _b, _c, _d;
        if (lastCopyrightComment) {
            if (((_a = comment.source) === null || _a === void 0 ? void 0 : _a.start) === undefined || ((_b = lastCopyrightComment.source) === null || _b === void 0 ? void 0 : _b.end) === undefined) {
                return false;
            }
            if (comment.source.start.line === lastCopyrightComment.source.end.line + 1) {
                // Copyright continues in next comment via //
                lastCopyrightComment = comment;
            }
            else {
                // The next comment is not directly under the prior comment
                return false;
            }
        }
        else if (comment.text.toLowerCase().includes("copyright")) {
            lastCopyrightComment = comment;
            if (((_c = comment.source) === null || _c === void 0 ? void 0 : _c.start) === undefined || ((_d = comment.source) === null || _d === void 0 ? void 0 : _d.end) === undefined) {
                return false;
            }
            if (comment.source.start.line !== comment.source.end.line) {
                // A multi-line copyright comment such as /* */
                return false; // Stop the iteration
            }
        }
        return;
    });
    return lastCopyrightComment;
}
//# sourceMappingURL=insertImport.js.map