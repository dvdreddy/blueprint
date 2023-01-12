"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
exports.TestErrorBoundary = void 0;
var tslib_1 = require("tslib");
var chai_1 = require("chai");
var React = tslib_1.__importStar(require("react"));
/**
 * Use this component when you want to validate component errors _during the component lifecycle_.
 * Note that this is not useful in validating errors thrown in component constructors.
 */
var TestErrorBoundary = /** @class */ (function (_super) {
    tslib_1.__extends(TestErrorBoundary, _super);
    function TestErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            didCatch: false,
        };
        return _this;
    }
    TestErrorBoundary.prototype.componentDidCatch = function (error, _info) {
        var _this = this;
        this.setState({ didCatch: true }, function () {
            (0, chai_1.expect)(error.message).to.equal(_this.props.expectedErrorString);
        });
    };
    TestErrorBoundary.prototype.render = function () {
        if (this.state.didCatch) {
            return null;
        }
        return this.props.children;
    };
    return TestErrorBoundary;
}(React.Component));
exports.TestErrorBoundary = TestErrorBoundary;
//# sourceMappingURL=testErrorBoundary.js.map