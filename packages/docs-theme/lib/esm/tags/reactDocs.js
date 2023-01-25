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
import * as React from "react";
var ReactDocsTagRenderer = /** @class */ (function () {
    function ReactDocsTagRenderer(docs) {
        var _this = this;
        this.docs = docs;
        /**
         * Given the name of a component, like `"ColorSchemes"`, attempts to resolve
         * it to an actual component class in the given map, or in the default map which contains
         * valid docs components from this package. Provide a custom map to inject your own components.
         */
        this.render = function (_a) {
            var componentName = _a.value;
            if (componentName == null) {
                return null;
            }
            var docsComponent = _this.docs[componentName];
            if (docsComponent == null) {
                throw new Error("Unknown @reactDocs component: ".concat(componentName));
            }
            return React.createElement(docsComponent);
        };
    }
    return ReactDocsTagRenderer;
}());
export { ReactDocsTagRenderer };
//# sourceMappingURL=reactDocs.js.map