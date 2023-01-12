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
exports.checkImportExists = void 0;
const cssSyntax_1 = require("./cssSyntax");
/**
 * Returns true if the given import exists in the file, otherwise returns false.
 * If `importPath` is an array, any of the strings has to match in order fortrue to be returned.
 */
function checkImportExists(cssSyntaxType, root, importPath, namespace) {
    let hasBpVarsImport = false;
    const walkRegex = cssSyntaxType === cssSyntax_1.CssSyntax.LESS ? /^import$/i : /^use$/i;
    root.walkAtRules(walkRegex, atRule => {
        for (const path of [importPath, `${importPath}.${cssSyntax_1.CssExtensionMap[cssSyntaxType]}`]) {
            if (stripQuotes(stripLessReference(atRule.params)) === path) {
                hasBpVarsImport = true;
                return false; // Stop the iteration
            }
            if (namespace !== undefined) {
                const asText = ` as ${namespace}`;
                if (atRule.params.endsWith(asText) &&
                    stripQuotes(atRule.params.substring(0, atRule.params.lastIndexOf(asText))) === path) {
                    hasBpVarsImport = true;
                    return false; // Stop the iteration
                }
            }
        }
        return;
    });
    return hasBpVarsImport;
}
exports.checkImportExists = checkImportExists;
function stripLessReference(str) {
    const LESS_REFERENCE = "(reference)";
    if (str.startsWith(`${LESS_REFERENCE} `)) {
        return str.substring(LESS_REFERENCE.length + 1);
    }
    return str;
}
function stripQuotes(str) {
    if ((str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') ||
        (str.charAt(0) === "'" && str.charAt(str.length - 1) === "'")) {
        // omit first and last character
        return str.substring(1, str.length - 1);
    }
    return str;
}
//# sourceMappingURL=checkImportExists.js.map