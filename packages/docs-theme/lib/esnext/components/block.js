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
import classNames from "classnames";
import * as React from "react";
import { Classes, Code, H3 } from "@blueprintjs/core";
export function renderBlock(
/** the block to render */
block, 
/** known tag renderers */
tagRenderers, 
/** class names to apply to element wrapping string content. */
textClassName) {
    if (block === undefined) {
        return null;
    }
    const textClasses = classNames(Classes.RUNNING_TEXT, textClassName);
    const contents = block.contents.map((node, i) => {
        if (typeof node === "string") {
            return React.createElement("div", { className: textClasses, key: i, dangerouslySetInnerHTML: { __html: node } });
        }
        try {
            const renderer = tagRenderers[node.tag];
            if (renderer === undefined) {
                throw new Error(`Unknown @tag: ${node.tag}`);
            }
            return React.createElement(renderer, { ...node, key: i });
        }
        catch (ex) {
            console.error(ex.message);
            return (React.createElement(H3, { key: `__error-${i}` },
                React.createElement(Code, null, ex.message)));
        }
    });
    return React.createElement("div", { className: "docs-section" }, contents);
}
//# sourceMappingURL=block.js.map