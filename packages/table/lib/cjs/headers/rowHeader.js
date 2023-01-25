"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDefaultRowHeader = exports.RowHeader = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var Classes = tslib_1.__importStar(require("../common/classes"));
var resizeHandle_1 = require("../interactions/resizeHandle");
var regions_1 = require("../regions");
var header_1 = require("./header");
var rowHeaderCell2_1 = require("./rowHeaderCell2");
var RowHeader = /** @class */ (function (_super) {
    tslib_1.__extends(RowHeader, _super);
    function RowHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapCells = function (cells) {
            var _a = _this.props, rowIndexStart = _a.rowIndexStart, grid = _a.grid;
            var tableHeight = grid.getRect().height;
            var scrollTopCorrection = _this.props.grid.getCumulativeHeightBefore(rowIndexStart);
            var style = {
                // reduce the height to clamp the sliding window as we approach the final headers; otherwise,
                // we'll have tons of useless whitespace at the end.
                height: tableHeight - scrollTopCorrection,
                // only header cells in view will render, but we need to reposition them to stay in view
                // as we scroll vertically.
                transform: "translateY(".concat(scrollTopCorrection || 0, "px)"),
            };
            // add a wrapper set to the full-table height to ensure container styles stretch from the first
            // cell all the way to the last
            return (React.createElement("div", { style: { height: tableHeight } },
                React.createElement("div", { className: Classes.TABLE_ROW_HEADERS_CELLS_CONTAINER, style: style }, cells)));
        };
        _this.convertPointToRow = function (clientXOrY, useMidpoint) {
            var _a;
            return (_a = _this.props.locator) === null || _a === void 0 ? void 0 : _a.convertPointToRow(clientXOrY, useMidpoint);
        };
        _this.getCellExtremaClasses = function (index, indexEnd) {
            return _this.props.grid.getExtremaClasses(index, 0, indexEnd, 1);
        };
        _this.getRowHeight = function (index) {
            return _this.props.grid.getRowRect(index).height;
        };
        _this.getDragCoordinate = function (clientCoords) {
            return clientCoords[1]; // y-coordinate
        };
        _this.getMouseCoordinate = function (event) {
            return event.clientY;
        };
        _this.handleResizeEnd = function (index, size) {
            _this.props.onResizeGuide(null);
            _this.props.onRowHeightChanged(index, size);
        };
        _this.handleSizeChanged = function (index, size) {
            var rect = _this.props.grid.getRowRect(index);
            _this.props.onResizeGuide([rect.top + size]);
        };
        _this.isCellSelected = function (index) {
            return regions_1.Regions.hasFullRow(_this.props.selectedRegions, index);
        };
        _this.isGhostIndex = function (index) {
            return _this.props.grid.isGhostIndex(index, -1);
        };
        _this.renderGhostCell = function (index, extremaClasses) {
            var rect = _this.props.grid.getGhostCellRect(index, 0);
            return (React.createElement(rowHeaderCell2_1.RowHeaderCell2, { className: (0, classnames_1.default)(extremaClasses), index: index, key: Classes.rowIndexClass(index), loading: _this.props.loading, style: { height: "".concat(rect.height, "px") } }));
        };
        _this.toRegion = function (index1, index2) {
            // the `this` value is messed up for Regions.row, so we have to have a wrapper function here
            return regions_1.Regions.row(index1, index2);
        };
        return _this;
    }
    RowHeader.prototype.componentDidMount = function () {
        var _a, _b;
        (_b = (_a = this.props).onMount) === null || _b === void 0 ? void 0 : _b.call(_a, "row");
    };
    RowHeader.prototype.render = function () {
        var _a = this.props, 
        // from IRowHeaderProps
        onRowHeightChanged = _a.onRowHeightChanged, rowHeaderCellRenderer = _a.rowHeaderCellRenderer, 
        // from IRowHeights
        minSize = _a.minRowHeight, maxSize = _a.maxRowHeight, defaultRowHeight = _a.defaultRowHeight, 
        // from IRowIndices
        indexStart = _a.rowIndexStart, indexEnd = _a.rowIndexEnd, 
        // from IHeaderProps
        spreadableProps = tslib_1.__rest(_a, ["onRowHeightChanged", "rowHeaderCellRenderer", "minRowHeight", "maxRowHeight", "defaultRowHeight", "rowIndexStart", "rowIndexEnd"]);
        return (React.createElement(header_1.Header, tslib_1.__assign({ convertPointToIndex: this.convertPointToRow, fullRegionCardinality: regions_1.RegionCardinality.FULL_ROWS, getCellExtremaClasses: this.getCellExtremaClasses, getCellIndexClass: Classes.rowCellIndexClass, getCellSize: this.getRowHeight, getDragCoordinate: this.getDragCoordinate, getIndexClass: Classes.rowIndexClass, getMouseCoordinate: this.getMouseCoordinate, ghostCellRenderer: this.renderGhostCell, handleResizeEnd: this.handleResizeEnd, handleSizeChanged: this.handleSizeChanged, headerCellIsReorderablePropName: "enableRowReordering", headerCellIsSelectedPropName: "isRowSelected", headerCellRenderer: rowHeaderCellRenderer, indexEnd: indexEnd, indexStart: indexStart, isCellSelected: this.isCellSelected, isGhostIndex: this.isGhostIndex, maxSize: maxSize, minSize: minSize, resizeOrientation: resizeHandle_1.Orientation.HORIZONTAL, selectedRegions: [], toRegion: this.toRegion, wrapCells: this.wrapCells }, spreadableProps)));
    };
    RowHeader.defaultProps = {
        rowHeaderCellRenderer: renderDefaultRowHeader,
    };
    return RowHeader;
}(React.Component));
exports.RowHeader = RowHeader;
/**
 * A default implementation of `RowHeaderRenderer` that displays 1-indexed
 * numbers for each row.
 */
function renderDefaultRowHeader(rowIndex) {
    return React.createElement(rowHeaderCell2_1.RowHeaderCell2, { index: rowIndex, name: "".concat(rowIndex + 1) });
}
exports.renderDefaultRowHeader = renderDefaultRowHeader;
//# sourceMappingURL=rowHeader.js.map