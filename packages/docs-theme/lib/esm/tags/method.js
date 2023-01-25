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
export var Method = function (_a, _b) {
    var className = _a.className, value = _a.value;
    var getDocsData = _b.getDocsData;
    var typescript = getDocsData().typescript;
    var member = typescript[value];
    if (member === undefined) {
        var possibleClass = value.split(".")[0];
        var possibleClassMethod_1 = value.split(".")[1];
        var classMember = typescript[possibleClass];
        if (isTsClass(classMember) && possibleClassMethod_1) {
            var classMethod = classMember.methods.find(function (method) { return method.name === possibleClassMethod_1; });
            if (isTsMethod(classMethod)) {
                return React.createElement(MethodTable, { className: className, data: classMethod });
            }
        }
        throw new Error("Unknown @method ".concat(value));
    }
    else if (isTsMethod(member)) {
        return React.createElement(MethodTable, { className: className, data: member });
    }
    else {
        throw new Error("\"@method ".concat(value, "\": unknown member kind \"").concat(member.kind, "\""));
    }
};
Method.contextTypes = DocumentationContextTypes;
Method.displayName = "Docs2.Method";
//# sourceMappingURL=method.js.map