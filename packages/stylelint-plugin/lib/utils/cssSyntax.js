"use strict";
/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
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
exports.isCssSyntaxToStringMap = exports.getCssSyntax = exports.BpVariableImportMap = exports.BpPrefixVariableMap = exports.BpSassNamespace = exports.BpVariablePrefixMap = exports.CssExtensionMap = exports.CssSyntax = void 0;
var CssSyntax;
(function (CssSyntax) {
    CssSyntax["SASS"] = "sass";
    CssSyntax["LESS"] = "less";
    CssSyntax["OTHER"] = "other";
})(CssSyntax = exports.CssSyntax || (exports.CssSyntax = {}));
exports.CssExtensionMap = {
    [CssSyntax.SASS]: "scss",
    [CssSyntax.LESS]: "less",
};
exports.BpVariablePrefixMap = {
    [CssSyntax.SASS]: "$",
    [CssSyntax.LESS]: "@",
};
exports.BpSassNamespace = "bp";
exports.BpPrefixVariableMap = {
    [CssSyntax.SASS]: `#{${exports.BpSassNamespace}.$ns}`,
    [CssSyntax.LESS]: "@{bp-ns}",
};
exports.BpVariableImportMap = {
    [CssSyntax.SASS]: "@blueprintjs/core/lib/scss/variables.scss",
    [CssSyntax.LESS]: "~@blueprintjs/core/lib/less/variables",
};
/**
 * Returns the flavor of the CSS we're dealing with.
 */
function getCssSyntax(fileName) {
    for (const cssSyntax of Object.keys(exports.CssExtensionMap)) {
        if (fileName.endsWith(`.${exports.CssExtensionMap[cssSyntax]}`)) {
            return cssSyntax;
        }
    }
    return CssSyntax.OTHER;
}
exports.getCssSyntax = getCssSyntax;
const isCssSyntaxToStringMap = (obj) => {
    if (typeof obj !== "object" || obj == null) {
        return false;
    }
    // Check that the keys and their values are correct
    const allowedKeys = new Set(Object.values(CssSyntax).filter(v => v !== CssSyntax.OTHER));
    return Object.keys(obj).every(key => allowedKeys.has(key) && typeof obj[key] === "string");
};
exports.isCssSyntaxToStringMap = isCssSyntaxToStringMap;
//# sourceMappingURL=cssSyntax.js.map