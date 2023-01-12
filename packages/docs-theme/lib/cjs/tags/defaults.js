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
exports.createDefaultRenderers = void 0;
var css_1 = require("./css");
var heading_1 = require("./heading");
var method_1 = require("./method");
var see_1 = require("./see");
var typescript_1 = require("./typescript");
function createDefaultRenderers() {
    return {
        css: css_1.CssExample,
        // HACKHACK https://github.com/palantir/blueprint/issues/4342
        heading: heading_1.Heading,
        interface: typescript_1.TypescriptExample,
        method: method_1.Method,
        page: function () { return null; },
        see: see_1.SeeTag,
    };
}
exports.createDefaultRenderers = createDefaultRenderers;
//# sourceMappingURL=defaults.js.map