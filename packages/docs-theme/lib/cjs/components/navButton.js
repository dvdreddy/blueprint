"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavButton = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var NavButton = function (props) { return (React.createElement("div", { className: (0, classnames_1.default)("docs-nav-button", core_1.Classes.TEXT_MUTED), onClick: props.onClick },
    React.createElement(core_1.Icon, { icon: props.icon }),
    React.createElement("span", { className: core_1.Classes.FILL }, props.text),
    React.createElement("div", { style: { opacity: 0.5 } },
        React.createElement(core_1.KeyCombo, { combo: props.hotkey, minimal: true })))); };
exports.NavButton = NavButton;
//# sourceMappingURL=navButton.js.map