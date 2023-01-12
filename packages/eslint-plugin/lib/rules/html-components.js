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
exports.htmlComponentsRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const addImportToFile_1 = require("./utils/addImportToFile");
const createRule_1 = require("./utils/createRule");
const fixList_1 = require("./utils/fixList");
const getProgram_1 = require("./utils/getProgram");
const PATTERN = /^(h[1-6]|code|pre|blockquote|table)$/;
// tslint:disable object-literal-sort-keys
exports.htmlComponentsRule = (0, createRule_1.createRule)({
    name: "html-components",
    meta: {
        docs: {
            description: "Enforce usage of Blueprint components over JSX intrinsic elements.",
            recommended: "error",
            requiresTypeChecking: false,
        },
        fixable: "code",
        messages: {
            useBlueprintComponents: "use Blueprint {{ componentName }} component instead of JSX intrinsic element.",
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],
    create: context => ({
        JSXOpeningElement: node => create(context, node),
    }),
});
function create(context, node) {
    const tagNameNode = node.name;
    if (tagNameNode.type === utils_1.AST_NODE_TYPES.JSXIdentifier) {
        const match = PATTERN.exec(tagNameNode.name);
        if (match != null) {
            const newTagName = getNewTagName(match[1]);
            context.report({
                messageId: "useBlueprintComponents",
                data: {
                    componentName: newTagName,
                },
                node,
                fix: fixer => {
                    const fixes = new fixList_1.FixList();
                    fixes.addFixes(fixer.replaceText(tagNameNode, newTagName));
                    // Find closing tag after this opening tag to replace both in one failure
                    if (!node.selfClosing) {
                        const closingNode = node.parent.closingElement;
                        if (closingNode != null) {
                            fixes.addFixes(fixer.replaceText(closingNode.name, newTagName));
                        }
                    }
                    // Add import for the new tag
                    const program = (0, getProgram_1.getProgram)(node);
                    if (program !== undefined) {
                        fixes.addFixes((0, addImportToFile_1.addImportToFile)(program, [newTagName], "@blueprintjs/core")(fixer));
                    }
                    return fixes.getFixes();
                },
            });
        }
    }
}
function getNewTagName(tagName) {
    switch (tagName) {
        case "table":
            return "HTMLTable";
        default:
            return tagName.charAt(0).toUpperCase() + tagName.slice(1);
    }
}
//# sourceMappingURL=html-components.js.map