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
import { isPageNode } from "@documentalist/client";
/**
 * Removes leading indents from a template string without removing all leading whitespace.
 * Trims resulting string to remove blank first/last lines caused by ` location.
 */
export function dedent(strings, ...values) {
    let fullString = strings.reduce((accumulator, str, i) => {
        return accumulator + values[i - 1].toString() + str;
    });
    // match all leading spaces/tabs at the start of each line
    const match = fullString.match(/^[ \t]*(?=\S)/gm);
    // find the smallest indent, we don't want to remove all leading whitespace
    const indent = Math.min(...match.map(el => el.length));
    const regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString.trim();
}
export function smartSearch(query, ...content) {
    const terms = query.toLowerCase().split(" ");
    const dataToSearch = content.map(s => s.toLowerCase());
    return terms.every(term => dataToSearch.some(d => d.indexOf(term) >= 0));
}
export function createKeyEventHandler(actions, preventDefault = false) {
    return (e) => {
        for (const k of Object.keys(actions)) {
            const key = Number(k);
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            // eslint-disable-next-line deprecation/deprecation
            if (e.which === key) {
                if (preventDefault) {
                    e.preventDefault();
                }
                actions[key](e);
            }
        }
        actions.all?.(e);
    };
}
/**
 * Performs an in-order traversal of the layout tree, invoking the callback for each node.
 * Callback receives an array of ancestors with direct parent first in the list.
 */
export function eachLayoutNode(layout, callback, parents = []) {
    layout.forEach(node => {
        callback(node, parents);
        if (isPageNode(node)) {
            eachLayoutNode(node.children, callback, [node, ...parents]);
        }
    });
}
//# sourceMappingURL=utils.js.map