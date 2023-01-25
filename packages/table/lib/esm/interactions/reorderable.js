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
import { __assign, __extends } from "tslib";
import * as React from "react";
import { Utils as CoreUtils } from "@blueprintjs/core";
import { Utils } from "../common/utils";
import { RegionCardinality, Regions } from "../regions";
import { Draggable } from "./draggable";
var DragReorderable = /** @class */ (function (_super) {
    __extends(DragReorderable, _super);
    function DragReorderable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedRegionLength = 0;
        _this.handleActivate = function (event) {
            if (_this.shouldIgnoreMouseDown(event)) {
                return false;
            }
            var region = _this.props.locateClick(event);
            if (!Regions.isValid(region)) {
                return false;
            }
            var cardinality = Regions.getRegionCardinality(region);
            var isColumnHeader = cardinality === RegionCardinality.FULL_COLUMNS;
            var isRowHeader = cardinality === RegionCardinality.FULL_ROWS;
            if (!isColumnHeader && !isRowHeader) {
                return false;
            }
            var _a = _this.props.selectedRegions, selectedRegions = _a === void 0 ? [] : _a;
            var selectedRegionIndex = Regions.findContainingRegion(selectedRegions, region);
            if (selectedRegionIndex >= 0) {
                var selectedRegion = selectedRegions[selectedRegionIndex];
                if (Regions.getRegionCardinality(selectedRegion) !== cardinality) {
                    // ignore FULL_TABLE selections
                    return false;
                }
                // cache for easy access later in the lifecycle
                var selectedInterval = isRowHeader ? selectedRegion.rows : selectedRegion.cols;
                _this.selectedRegionStartIndex = selectedInterval[0];
                // add 1 because the selected interval is inclusive, which simple subtraction doesn't
                // account for (e.g. in a FULL_COLUMNS range from 3 to 6, 6 - 3 = 3, but the selection
                // actually includes four columns: 3, 4, 5, and 6)
                _this.selectedRegionLength = selectedInterval[1] - selectedInterval[0] + 1;
            }
            else {
                // select the new region to avoid complex and unintuitive UX w/r/t the existing selection
                _this.maybeSelectRegion(region);
                var regionRange = isRowHeader ? region.rows : region.cols;
                _this.selectedRegionStartIndex = regionRange[0];
                _this.selectedRegionLength = regionRange[1] - regionRange[0] + 1;
            }
            return true;
        };
        _this.handleDragMove = function (event, coords) {
            var oldIndex = _this.selectedRegionStartIndex;
            var guideIndex = _this.props.locateDrag(event, coords);
            if (oldIndex === undefined || guideIndex === undefined) {
                return;
            }
            var length = _this.selectedRegionLength;
            var reorderedIndex = Utils.guideIndexToReorderedIndex(oldIndex, guideIndex, length);
            _this.props.onReordering(oldIndex, reorderedIndex, length);
        };
        _this.handleDragEnd = function (event, coords) {
            var oldIndex = _this.selectedRegionStartIndex;
            var guideIndex = _this.props.locateDrag(event, coords);
            if (oldIndex === undefined || guideIndex === undefined) {
                return;
            }
            var length = _this.selectedRegionLength;
            var reorderedIndex = Utils.guideIndexToReorderedIndex(oldIndex, guideIndex, length);
            _this.props.onReordered(oldIndex, reorderedIndex, length);
            // the newly reordered region becomes the only selection
            var newRegion = _this.props.toRegion(reorderedIndex, reorderedIndex + length - 1);
            _this.maybeSelectRegion(newRegion);
            // resetting is not strictly required, but it's cleaner
            _this.selectedRegionStartIndex = undefined;
            _this.selectedRegionLength = 0;
        };
        return _this;
    }
    DragReorderable.prototype.render = function () {
        var draggableProps = this.getDraggableProps();
        return (React.createElement(Draggable, __assign({}, draggableProps, { preventDefault: false }), this.props.children));
    };
    DragReorderable.prototype.getDraggableProps = function () {
        return this.props.onReordered == null
            ? {}
            : {
                onActivate: this.handleActivate,
                onDragEnd: this.handleDragEnd,
                onDragMove: this.handleDragMove,
            };
    };
    DragReorderable.prototype.shouldIgnoreMouseDown = function (event) {
        var disabled = this.props.disabled;
        var isDisabled = CoreUtils.isFunction(disabled) ? disabled === null || disabled === void 0 ? void 0 : disabled(event) : disabled;
        return !Utils.isLeftClick(event) || isDisabled;
    };
    DragReorderable.prototype.maybeSelectRegion = function (region) {
        var nextSelectedRegions = [region];
        if (!CoreUtils.deepCompareKeys(nextSelectedRegions, this.props.selectedRegions)) {
            this.props.onSelection(nextSelectedRegions);
            // move the focused cell into the newly selected region
            this.props.onFocusedCell(__assign(__assign({}, Regions.getFocusCellCoordinatesFromRegion(region)), { focusSelectionIndex: 0 }));
        }
    };
    DragReorderable.defaultProps = {
        selectedRegions: [],
    };
    return DragReorderable;
}(React.PureComponent));
export { DragReorderable };
//# sourceMappingURL=reorderable.js.map