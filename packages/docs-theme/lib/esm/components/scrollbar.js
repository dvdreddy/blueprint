/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
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
import { Classes } from "@blueprintjs/core";
/**
 * Inject some CSS style rules into a new `<style>` element to add padding equal to the
 * width of the scrollbar when an `Overlay` is open, such that page content will not
 * shift due to the disappearing vertical scrollbar.
 */
export function addScrollbarStyle() {
    var width = getScrollbarWidth();
    var stylesheet = createStyleSheet();
    var NS = Classes.getClassNamespace();
    stylesheet.insertRule(".".concat(NS, "-overlay-open .docs-banner { padding-right: ").concat(20 + width, "px; }"), 0);
    stylesheet.insertRule(".".concat(NS, "-overlay-open .docs-root { padding-right: ").concat(width, "px }"), 0);
}
function createStyleSheet() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
}
function getScrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.overflow = "scroll";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}
//# sourceMappingURL=scrollbar.js.map