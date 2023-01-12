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
exports.addImportToFile = void 0;
var tslint_1 = require("tslint");
var _2_8_1 = require("tsutils/typeguard/2.8");
function addImportToFile(file, imports, packageName) {
    var packageToModify = file.statements.find(function (statement) { return (0, _2_8_1.isImportDeclaration)(statement) && statement.moduleSpecifier.getText() === "\"".concat(packageName, "\""); });
    if (packageToModify &&
        packageToModify.importClause &&
        packageToModify.importClause.namedBindings &&
        (0, _2_8_1.isNamedImports)(packageToModify.importClause.namedBindings)) {
        var existingImports = packageToModify.importClause.namedBindings.elements.map(function (el) { return el.name.getText(); });
        // Poor man's lodash.uniq without the dep.
        var newImports = Array.from(new Set(existingImports.concat(imports))).sort();
        var importString = "{ ".concat(newImports.join(", "), " }");
        return tslint_1.Replacement.replaceNode(packageToModify.importClause.namedBindings, importString);
    }
    else {
        // we always place the import in alphabetical order. If imports are already alpha-ordered, this will act nicely
        // with existing lint rules. If imports are not alpha-ordered, this may appear weird.
        var allImports = file.statements.filter(_2_8_1.isImportDeclaration);
        var newImportIndex = allImports.findIndex(function (imp) {
            // slice the quotes off each module specifier
            return compare(imp.moduleSpecifier.getText().slice(1, -1), packageName) === 1;
        });
        var startIndex = newImportIndex === -1 ? 0 : allImports[newImportIndex].getStart();
        return tslint_1.Replacement.appendText(startIndex, "import { ".concat(imports.sort().join(", "), " } from \"").concat(packageName, "\";\n"));
    }
}
exports.addImportToFile = addImportToFile;
function isLow(value) {
    return value[0] === "." || value[0] === "/";
}
// taken from tslint orderedImportRules
function compare(a, b) {
    if (isLow(a) && !isLow(b)) {
        return 1;
    }
    else if (!isLow(a) && isLow(b)) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
}
//# sourceMappingURL=addImportToFile.js.map