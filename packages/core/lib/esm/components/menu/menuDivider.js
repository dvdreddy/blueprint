/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
import { __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import * as Classes from "../../common/classes";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { H6 } from "../html/html";
var MenuDivider = /** @class */ (function (_super) {
    __extends(MenuDivider, _super);
    function MenuDivider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuDivider.prototype.render = function () {
        var _a = this.props, className = _a.className, title = _a.title;
        if (title == null) {
            // simple divider
            return React.createElement("li", { className: classNames(Classes.MENU_DIVIDER, className), role: "none" });
        }
        else {
            // section header with title
            return (React.createElement("li", { className: classNames(Classes.MENU_HEADER, className), role: "none" },
                React.createElement(H6, null, title)));
        }
    };
    MenuDivider.displayName = "".concat(DISPLAYNAME_PREFIX, ".MenuDivider");
    return MenuDivider;
}(React.Component));
export { MenuDivider };
//# sourceMappingURL=menuDivider.js.map