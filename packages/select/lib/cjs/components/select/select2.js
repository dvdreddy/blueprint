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
exports.Select2 = void 0;
var tslib_1 = require("tslib");
/** @fileoverview "V2" variant of Select which uses Popover2 instead of Popover */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var common_1 = require("../../common");
var queryList_1 = require("../query-list/queryList");
var Select2 = /** @class */ (function (_super) {
    tslib_1.__extends(Select2, _super);
    function Select2() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.inputElement = null;
        _this.queryList = null;
        _this.handleInputRef = (0, core_1.refHandler)(_this, "inputElement", (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef);
        _this.handleQueryListRef = function (ref) { return (_this.queryList = ref); };
        _this.listboxId = core_1.Utils.uniqueId("listbox");
        _this.renderQueryList = function (listProps) {
            // not using defaultProps cuz they're hard to type with generics (can't use <T> on static members)
            var _a = _this.props, _b = _a.filterable, filterable = _b === void 0 ? true : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.inputProps, inputProps = _d === void 0 ? {} : _d, _e = _a.popoverContentProps, popoverContentProps = _e === void 0 ? {} : _e, _f = _a.popoverProps, popoverProps = _f === void 0 ? {} : _f, popoverRef = _a.popoverRef;
            var input = (React.createElement(core_1.InputGroup, tslib_1.__assign({ "aria-autocomplete": "list", leftIcon: "search", placeholder: "Filter...", rightElement: _this.maybeRenderClearButton(listProps.query) }, inputProps, { inputRef: _this.handleInputRef, onChange: listProps.handleQueryChange, value: listProps.query })));
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            // N.B. no need to set `fill` since that is unused with the `renderTarget` API
            return (React.createElement(popover2_1.Popover2, tslib_1.__assign({ autoFocus: false, enforceFocus: false, isOpen: _this.state.isOpen, disabled: disabled, placement: popoverProps.position || popoverProps.placement ? undefined : "bottom-start" }, popoverProps, { className: (0, classnames_1.default)(listProps.className, popoverProps.className), content: React.createElement("div", tslib_1.__assign({}, popoverContentProps, { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }),
                    filterable ? input : undefined,
                    listProps.itemList), onClosing: _this.handlePopoverClosing, onInteraction: _this.handlePopoverInteraction, onOpened: _this.handlePopoverOpened, onOpening: _this.handlePopoverOpening, popoverClassName: (0, classnames_1.default)(common_1.Classes.SELECT_POPOVER, popoverProps.popoverClassName), popupKind: popover2_1.PopupKind.LISTBOX, ref: popoverRef, renderTarget: _this.getPopoverTargetRenderer(listProps, _this.state.isOpen) })));
        };
        // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like
        // the "fill" prop. Note that we must take `isOpen` as an argument to force this render function to be called
        // again after that state changes.
        _this.getPopoverTargetRenderer = function (listProps, isOpen) {
            // N.B. pull out `isOpen` so that it's not forwarded to the DOM, but remember not to use it directly
            // since it may be stale (`renderTarget` is not re-invoked on this.state changes).
            // eslint-disable-next-line react/display-name
            return function (_a) {
                var _b;
                var _isOpen = _a.isOpen, ref = _a.ref, targetProps = tslib_1.__rest(_a, ["isOpen", "ref"]);
                var popoverTargetProps = _this.props.popoverTargetProps;
                var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
                return (React.createElement("div", tslib_1.__assign({ "aria-controls": _this.listboxId }, popoverTargetProps, targetProps, { "aria-expanded": isOpen, 
                    // Note that we must set FILL here in addition to children to get the wrapper element to full width
                    className: (0, classnames_1.default)(targetProps.className, popoverTargetProps === null || popoverTargetProps === void 0 ? void 0 : popoverTargetProps.className, (_b = {},
                        _b[core_1.Classes.FILL] = _this.props.fill,
                        _b)), 
                    // Normally, Popover2 would also need to attach its own `onKeyDown` handler via `targetProps`,
                    // but in our case we fully manage that interaction and listen for key events to open/close
                    // the popover, so we elide it from the DOM.
                    onKeyDown: isOpen ? handleKeyDown : _this.handleTargetKeyDown, onKeyUp: isOpen ? handleKeyUp : undefined, ref: ref, role: "combobox" }), _this.props.children));
            };
        };
        /**
         * Target wrapper element "keydown" handler while the popover is closed.
         */
        _this.handleTargetKeyDown = function (event) {
            // open popover when arrow key pressed on target while closed
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            /* eslint-disable deprecation/deprecation */
            if (event.which === core_1.Keys.ARROW_UP || event.which === core_1.Keys.ARROW_DOWN) {
                event.preventDefault();
                _this.setState({ isOpen: true });
            }
            else if (core_1.Keys.isKeyboardClick(event.keyCode)) {
                _this.setState({ isOpen: true });
            }
            /* eslint-enable deprecation/deprecation */
        };
        _this.handleItemSelect = function (item, event) {
            var _a, _b;
            _this.setState({ isOpen: false });
            (_b = (_a = _this.props).onItemSelect) === null || _b === void 0 ? void 0 : _b.call(_a, item, event);
        };
        _this.handlePopoverInteraction = function (isOpen, event) {
            var _a, _b;
            _this.setState({ isOpen: isOpen });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onInteraction) === null || _b === void 0 ? void 0 : _b.call(_a, isOpen, event);
        };
        _this.handlePopoverOpening = function (node) {
            var _a, _b, _c;
            // save currently focused element before popover steals focus, so we can restore it when closing.
            _this.previousFocusedElement = (_a = core_1.Utils.getActiveElement(_this.inputElement)) !== null && _a !== void 0 ? _a : undefined;
            if (_this.props.resetOnClose) {
                _this.resetQuery();
            }
            (_c = (_b = _this.props.popoverProps) === null || _b === void 0 ? void 0 : _b.onOpening) === null || _c === void 0 ? void 0 : _c.call(_b, node);
        };
        _this.handlePopoverOpened = function (node) {
            var _a, _b;
            // scroll active item into view after popover transition completes and all dimensions are stable.
            if (_this.queryList != null) {
                _this.queryList.scrollActiveItemIntoView();
            }
            _this.requestAnimationFrame(function () {
                var _a;
                var _b = _this.props.inputProps, inputProps = _b === void 0 ? {} : _b;
                // autofocus is enabled by default
                if (inputProps.autoFocus !== false) {
                    (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.focus();
                }
            });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpened) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.handlePopoverClosing = function (node) {
            var _a, _b;
            // restore focus to saved element.
            // timeout allows popover to begin closing and remove focus handlers beforehand.
            /* istanbul ignore next */
            _this.requestAnimationFrame(function () {
                if (_this.previousFocusedElement !== undefined) {
                    _this.previousFocusedElement.focus();
                    _this.previousFocusedElement = undefined;
                }
            });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onClosing) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.resetQuery = function () { return _this.queryList && _this.queryList.setQuery("", true); };
        return _this;
    }
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    Select2.ofType = function () {
        return Select2;
    };
    Select2.prototype.render = function () {
        // omit props specific to this component, spread the rest.
        var _a = this.props, filterable = _a.filterable, inputProps = _a.inputProps, menuProps = _a.menuProps, popoverProps = _a.popoverProps, restProps = tslib_1.__rest(_a, ["filterable", "inputProps", "menuProps", "popoverProps"]);
        return (React.createElement(queryList_1.QueryList, tslib_1.__assign({}, restProps, { menuProps: tslib_1.__assign(tslib_1.__assign({ "aria-label": "selectable options" }, menuProps), { id: this.listboxId }), onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList })));
    };
    Select2.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d, _e;
        if (((_a = prevProps.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.inputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            (0, core_1.setRef)((_c = prevProps.inputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.handleInputRef = (0, core_1.refHandler)(this, "inputElement", (_d = this.props.inputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            (0, core_1.setRef)((_e = this.props.inputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.inputElement);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    };
    Select2.prototype.maybeRenderClearButton = function (query) {
        return query.length > 0 ? (React.createElement(core_1.Button, { "aria-label": "Clear filter query", icon: "cross", minimal: true, onClick: this.resetQuery, title: "Clear filter query" })) : undefined;
    };
    Select2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Select2");
    return Select2;
}(core_1.AbstractPureComponent2));
exports.Select2 = Select2;
//# sourceMappingURL=select2.js.map