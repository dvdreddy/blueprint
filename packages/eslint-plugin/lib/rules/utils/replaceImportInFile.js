"use strict";
/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
exports.replaceImportInFile = void 0;
const utils_1 = require("@typescript-eslint/utils");
/**
 * Return a function which when provided with a fixer will produce a RuleFix to replace the
 * specified `fromImportName` with `toImportName` from the specified `packageName` at the top of the file.
 */
const replaceImportInFile = (program, fromImportName, toImportName, packageName) => fixer => {
    const fileImports = program.body.filter(node => node.type === utils_1.AST_NODE_TYPES.ImportDeclaration);
    const importToModify = fileImports.find(node => node.source.value === packageName);
    if (importToModify === undefined) {
        throw new Error(`Unable to find import from "${packageName}" while fixing lint error`);
    }
    const nodeToReplace = importToModify.specifiers.find(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier && specifier.local.name === fromImportName);
    if (nodeToReplace === undefined) {
        throw new Error(`Unable to find import { ${fromImportName} } from "${packageName}" while fixing lint error`);
    }
    return fixer.replaceText(nodeToReplace, toImportName);
};
exports.replaceImportInFile = replaceImportInFile;
//# sourceMappingURL=replaceImportInFile.js.map