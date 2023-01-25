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
import { __assign, __rest } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes } from "@blueprintjs/core";
export var NavMenuItem = function (props) {
    var className = props.className, isActive = props.isActive, isExpanded = props.isExpanded, section = props.section, htmlProps = __rest(props, ["className", "isActive", "isExpanded", "section"]);
    return (React.createElement("a", __assign({ className: classNames(Classes.MENU_ITEM, className) }, htmlProps),
        React.createElement("span", null, section.title),
        props.children));
};
NavMenuItem.displayName = "Docs2.NavMenuItem";
//# sourceMappingURL=navMenuItem.js.map