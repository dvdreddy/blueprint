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
import { isTsClass, isTsEnum, isTsInterface, isTsTypeAlias } from "@documentalist/client";
import * as React from "react";
import { DocumentationContextTypes } from "../common/context";
import { EnumTable } from "../components/typescript/enumTable";
import { InterfaceTable } from "../components/typescript/interfaceTable";
import { TypeAliasTable } from "../components/typescript/typeAliasTable";
export var TypescriptExample = function (_a, _b) {
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
    else if (isTsClass(member) || isTsInterface(member)) {
        return React.createElement(InterfaceTable, { className: className, data: member, title: "Props" });
    }
    else if (isTsEnum(member)) {
        return React.createElement(EnumTable, { className: className, data: member });
    }
    else if (isTsTypeAlias(member)) {
        return React.createElement(TypeAliasTable, { className: className, data: member });
    }
    else {
        throw new Error("\"@interface ".concat(value, "\": unknown member kind \"").concat(member.kind, "\""));
    }
};
TypescriptExample.contextTypes = DocumentationContextTypes;
TypescriptExample.displayName = "Docs2.TypescriptExample";
//# sourceMappingURL=typescript.js.map