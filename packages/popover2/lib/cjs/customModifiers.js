"use strict";
/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
exports.matchReferenceWidthModifier = void 0;
// tslint:disable object-literal-sort-keys
// adapted from https://popper.js.org/docs/v2/modifiers/community-modifiers/
exports.matchReferenceWidthModifier = {
    enabled: true,
    name: "matchReferenceWidth",
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: function (_a) {
        var state = _a.state;
        state.styles.popper.width = "".concat(state.rects.reference.width, "px");
    },
    effect: function (_a) {
        var state = _a.state;
        var referenceWidth = state.elements.reference.getBoundingClientRect().width;
        state.elements.popper.style.width = "".concat(referenceWidth, "px");
    },
};
//# sourceMappingURL=customModifiers.js.map