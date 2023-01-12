"use strict";
/*
 * Copyright 2019 Palantir Technologies, Inc. All rights reserved.
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
const classes_constants_1 = require("./classes-constants");
const html_components_1 = require("./html-components");
const icon_components_1 = require("./icon-components");
const no_deprecated_components_1 = require("./no-deprecated-components");
const no_deprecated_type_references_1 = require("./no-deprecated-type-references");
// eslint-disable-next-line import/no-default-export
exports.default = {
    "classes-constants": classes_constants_1.classesConstantsRule,
    "html-components": html_components_1.htmlComponentsRule,
    "icon-components": icon_components_1.iconComponentsRule,
    "no-deprecated-components": no_deprecated_components_1.noDeprecatedComponentsRule,
    "no-deprecated-core-components": no_deprecated_components_1.noDeprecatedCoreComponentsRule,
    "no-deprecated-datetime-components": no_deprecated_components_1.noDeprecatedDatetimeComponentsRule,
    "no-deprecated-select-components": no_deprecated_components_1.noDeprecatedSelectComponentsRule,
    "no-deprecated-table-components": no_deprecated_components_1.noDeprecatedTableComponentsRule,
    "no-deprecated-timezone-components": no_deprecated_components_1.noDeprecatedTimezoneComponentsRule,
    "no-deprecated-type-references": no_deprecated_type_references_1.noDeprecatedTypeReferencesRule,
};
//# sourceMappingURL=index.js.map