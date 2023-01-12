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
const tslib_1 = require("tslib");
const rules_1 = tslib_1.__importDefault(require("./rules"));
/**
 * Enable all Blueprint-specific lint rules defined in this package.
 */
module.exports = {
    configs: {
        recommended: {
            plugins: ["@blueprintjs"],
            rules: {
                "@blueprintjs/classes-constants": "error",
                "@blueprintjs/html-components": "error",
                "@blueprintjs/no-deprecated-components": "error",
                "@blueprintjs/no-deprecated-type-references": "error",
            },
        },
    },
    rules: rules_1.default,
};
//# sourceMappingURL=index.js.map