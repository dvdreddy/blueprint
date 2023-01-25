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
exports.TypescriptExample = void 0;
var tslib_1 = require("tslib");
var client_1 = require("@documentalist/client");
var React = tslib_1.__importStar(require("react"));
var context_1 = require("../common/context");
var enumTable_1 = require("../components/typescript/enumTable");
var interfaceTable_1 = require("../components/typescript/interfaceTable");
var typeAliasTable_1 = require("../components/typescript/typeAliasTable");
var TypescriptExample = function (_a, _b) {
    var className = _a.className, value = _a.value;
    var getDocsData = _b.getDocsData;
    var typescript = getDocsData().typescript;
    if (typescript == null || typescript[value] == null) {
        return null;
    }
    var member = typescript[value];
    if (member === undefined) {
        throw new Error("Unknown @interface ".concat(value));
    }
    else if ((0, client_1.isTsClass)(member) || (0, client_1.isTsInterface)(member)) {
        return React.createElement(interfaceTable_1.InterfaceTable, { className: className, data: member, title: "Props" });
    }
    else if ((0, client_1.isTsEnum)(member)) {
        return React.createElement(enumTable_1.EnumTable, { className: className, data: member });
    }
    else if ((0, client_1.isTsTypeAlias)(member)) {
        return React.createElement(typeAliasTable_1.TypeAliasTable, { className: className, data: member });
    }
    else {
        throw new Error("\"@interface ".concat(value, "\": unknown member kind \"").concat(member.kind, "\""));
    }
};
exports.TypescriptExample = TypescriptExample;
exports.TypescriptExample.contextTypes = context_1.DocumentationContextTypes;
exports.TypescriptExample.displayName = "Docs2.TypescriptExample";
//# sourceMappingURL=typescript.js.map