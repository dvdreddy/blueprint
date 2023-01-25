/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
import { __assign, __extends, __rest } from "tslib";
import classNames from "classnames";
import * as React from "react";
import * as Classes from "../common/classes";
import { Utils } from "../common/index";
import { Orientation } from "../interactions/resizeHandle";
import { RegionCardinality, Regions } from "../regions";
import { ColumnHeaderCell2 } from "./columnHeaderCell2";
import { Header } from "./header";
var ColumnHeader = /** @class */ (function (_super) {
    __extends(ColumnHeader, _super);
    function ColumnHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapCells = function (cells) {
            var _a = _this.props, columnIndexStart = _a.columnIndexStart, grid = _a.grid;
            var tableWidth = grid.getRect().width;
            var scrollLeftCorrection = _this.props.grid.getCumulativeWidthBefore(columnIndexStart);
            var style = {
                // only header cells in view will render, but we need to reposition them to stay in view
                // as we scroll horizontally.
                transform: "translateX(".concat(scrollLeftCorrection || 0, "px)"),
                // reduce the width to clamp the sliding window as we approach the final headers; otherwise,
                // we'll have tons of useless whitespace at the end.
                width: tableWidth - scrollLeftCorrection,
            };
            var classes = classNames(Classes.TABLE_THEAD, Classes.TABLE_COLUMN_HEADER_TR);
            // add a wrapper set to the full-table width to ensure container styles stretch from the first
            // cell all the way to the last
            return (React.createElement("div", { style: { width: tableWidth } },
                React.createElement("div", { style: style, className: classes, ref: _this.props.measurableElementRef }, cells)));
        };
        _this.convertPointToColumn = function (clientXOrY, useMidpoint) {
            return _this.props.locator.convertPointToColumn(clientXOrY, useMidpoint);
        };
        _this.getCellExtremaClasses = function (index, indexEnd) {
            return _this.props.grid.getExtremaClasses(0, index, 1, indexEnd);
        };
        _this.getColumnWidth = function (index) {
            return _this.props.grid.getColumnRect(index).width;
        };
        _this.getDragCoordinate = function (clientCoords) {
            return clientCoords[0]; // x-coordinate
        };
        _this.getMouseCoordinate = function (event) {
            return event.clientX;
        };
        _this.handleResizeEnd = function (index, size) {
            _this.props.onResizeGuide(null);
            _this.props.onColumnWidthChanged(index, size);
        };
        _this.handleResizeDoubleClick = function (index) {
            var _a = _this.props, minColumnWidth = _a.minColumnWidth, maxColumnWidth = _a.maxColumnWidth;
            var width = _this.props.locator.getWidestVisibleCellInColumn(index);
            var clampedWidth = Utils.clamp(width, minColumnWidth, maxColumnWidth);
            _this.props.onResizeGuide(null);
            _this.props.onColumnWidthChanged(index, clampedWidth);
        };
        _this.handleSizeChanged = function (index, size) {
            var rect = _this.props.grid.getColumnRect(index);
            _this.props.onResizeGuide([rect.left + size]);
        };
        _this.isCellSelected = function (index) {
            return Regions.hasFullColumn(_this.props.selectedRegions, index);
        };
        _this.isGhostIndex = function (index) {
            return _this.props.grid.isGhostIndex(-1, index);
        };
        _this.renderGhostCell = function (index, extremaClasses) {
            var _a = _this.props, grid = _a.grid, loading = _a.loading;
            var rect = grid.getGhostCellRect(0, index);
            var style = {
                flexBasis: "".concat(rect.width, "px"),
                width: "".concat(rect.width, "px"),
            };
            return (React.createElement(ColumnHeaderCell2, { className: classNames(extremaClasses), index: index, key: Classes.columnIndexClass(index), loading: loading, style: style }));
        };
        _this.toRegion = function (index1, index2) {
            return Regions.column(index1, index2);
        };
        return _this;
    }
    ColumnHeader.prototype.componentDidMount = function () {
        var _a, _b;
        (_b = (_a = this.props).onMount) === null || _b === void 0 ? void 0 : _b.call(_a, "column");
    };
    ColumnHeader.prototype.render = function () {
        var _a = this.props, 
        // from IColumnHeaderProps
        renderHeaderCell = _a.cellRenderer, onColumnWidthChanged = _a.onColumnWidthChanged, 
        // from IColumnWidths
        minSize = _a.minColumnWidth, maxSize = _a.maxColumnWidth, defaultColumnWidth = _a.defaultColumnWidth, 
        // from ColumnIndices
        indexStart = _a.columnIndexStart, indexEnd = _a.columnIndexEnd, 
        // from IHeaderProps
        spreadableProps = __rest(_a, ["cellRenderer", "onColumnWidthChanged", "minColumnWidth", "maxColumnWidth", "defaultColumnWidth", "columnIndexStart", "columnIndexEnd"]);
        return (React.createElement(Header, __assign({ convertPointToIndex: this.convertPointToColumn, fullRegionCardinality: RegionCardinality.FULL_COLUMNS, getCellExtremaClasses: this.getCellExtremaClasses, getCellIndexClass: Classes.columnCellIndexClass, getCellSize: this.getColumnWidth, getDragCoordinate: this.getDragCoordinate, getIndexClass: Classes.columnIndexClass, getMouseCoordinate: this.getMouseCoordinate, ghostCellRenderer: this.renderGhostCell, handleResizeDoubleClick: this.handleResizeDoubleClick, handleResizeEnd: this.handleResizeEnd, handleSizeChanged: this.handleSizeChanged, headerCellIsReorderablePropName: "enableColumnReordering", headerCellIsSelectedPropName: "isColumnSelected", headerCellRenderer: renderHeaderCell, indexEnd: indexEnd, indexStart: indexStart, isCellSelected: this.isCellSelected, isGhostIndex: this.isGhostIndex, maxSize: maxSize, minSize: minSize, resizeOrientation: Orientation.VERTICAL, selectedRegions: [], toRegion: this.toRegion, wrapCells: this.wrapCells }, spreadableProps)));
    };
    ColumnHeader.defaultProps = {
        isReorderable: false,
        isResizable: true,
        loading: false,
    };
    return ColumnHeader;
}(React.Component));
export { ColumnHeader };
//# sourceMappingURL=columnHeader.js.map