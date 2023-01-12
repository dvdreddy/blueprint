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
import { isTsClass, isTsMethod } from "@documentalist/client";
import * as React from "react";
import { DocumentationContextTypes } from "../common/context";
import { MethodTable } from "../components/typescript/methodTable";
export const Method = ({ className, value }, { getDocsData }) => {
    const { typescript } = getDocsData();
    const member = typescript[value];
    if (member === undefined) {
        const possibleClass = value.split(".")[0];
        const possibleClassMethod = value.split(".")[1];
        const classMember = typescript[possibleClass];
        if (isTsClass(classMember) && possibleClassMethod) {
            const classMethod = classMember.methods.find(method => method.name === possibleClassMethod);
            if (isTsMethod(classMethod)) {
                return React.createElement(MethodTable, { className: className, data: classMethod });
            }
        }
        throw new Error(`Unknown @method ${value}`);
    }
    else if (isTsMethod(member)) {
        return React.createElement(MethodTable, { className: className, data: member });
    }
    else {
        throw new Error(`"@method ${value}": unknown member kind "${member.kind}"`);
    }
};
Method.contextTypes = DocumentationContextTypes;
Method.displayName = "Docs2.Method";
//# sourceMappingURL=method.js.map