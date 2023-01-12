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
import { Utils } from "@blueprintjs/core";
/* eslint-enable @typescript-eslint/ban-types */
export function hasTypescriptData(docs) {
    return docs != null && docs.typescript != null;
}
export function hasNpmData(docs) {
    return docs != null && docs.npm != null;
}
export function hasKssData(docs) {
    return docs != null && docs.css != null;
}
/**
 * To enable context access in a React component, assign `static contextTypes` and declare `context` type:
 *
 * ```tsx
 * export class ContextComponent extends React.PureComponent<IApiLinkProps> {
 *     public static contextTypes = DocumentationContextTypes;
 *     public declare context: IDocumentationContext;
 *
 *     public render() {
 *         return this.context.renderBlock(this.props.block);
 *     }
 * }
 * ```
 *
 * NOTE: This does not reference prop-types to avoid copious "cannot be named" errors.
 */
export var DocumentationContextTypes = {
    getDocsData: assertFunctionProp,
    renderBlock: assertFunctionProp,
    renderType: assertFunctionProp,
    renderViewSourceLinkText: assertFunctionProp,
    showApiDocs: assertFunctionProp,
};
// simple alternative to prop-types dependency
function assertFunctionProp(obj, key) {
    if (obj[key] != null && Utils.isFunction(obj[key])) {
        return null;
    }
    return new Error("[Blueprint] Documentation context ".concat(key, " must be function."));
}
//# sourceMappingURL=context.js.map