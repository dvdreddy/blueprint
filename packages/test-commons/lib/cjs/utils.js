"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectPropValidationError = exports.dispatchTouchEvent = exports.createTouchEvent = exports.dispatchMouseEvent = exports.createMouseEvent = exports.dispatchTestKeyboardEventWithCode = exports.dispatchTestKeyboardEvent = void 0;
var tslib_1 = require("tslib");
var chai_1 = require("chai");
/**
 * Dispatch a native KeyBoardEvent on the target element with the given type
 * and event arguments. `type` can be one of "keydown|keyup|keypress".
 *
 * This method is for unit testing with PhantomJS and Chrome ONLY! The hacks we
 * use aren't compatible with other browsers. Do not use this method for
 * anything other than simulating keyboard events for PhantomJS and karma
 * chrome tests.
 */
function dispatchTestKeyboardEvent(target, eventType, key, shift) {
    if (shift === void 0) { shift = false; }
    dispatchTestKeyboardEventWithCode(target, eventType, key, key.charCodeAt(0), shift);
}
exports.dispatchTestKeyboardEvent = dispatchTestKeyboardEvent;
/**
 * Same as dispatchTestKeyboardEvent, but with more control over the keyCode.
 */
function dispatchTestKeyboardEventWithCode(target, eventType, key, keyCode, shift) {
    if (shift === void 0) { shift = false; }
    var event = document.createEvent("KeyboardEvent");
    event.initKeyboardEvent(eventType, true, true, window, key, 0, false, false, shift);
    // Hack around these readonly properties in WebKit and Chrome
    if (detectBrowser() === Browser.WEBKIT) {
        event.key = key;
        event.which = keyCode;
    }
    else {
        Object.defineProperty(event, "key", { get: function () { return key; } });
        Object.defineProperty(event, "which", { get: function () { return keyCode; } });
    }
    target.dispatchEvent(event);
}
exports.dispatchTestKeyboardEventWithCode = dispatchTestKeyboardEventWithCode;
/** Enum of known browsers */
var Browser;
(function (Browser) {
    Browser[Browser["CHROME"] = 0] = "CHROME";
    Browser[Browser["EDGE"] = 1] = "EDGE";
    Browser[Browser["FIREFOX"] = 2] = "FIREFOX";
    Browser[Browser["IE"] = 3] = "IE";
    Browser[Browser["UNKNOWN"] = 4] = "UNKNOWN";
    Browser[Browser["WEBKIT"] = 5] = "WEBKIT";
})(Browser || (Browser = {}));
/**
 * Use feature detection to determine current browser.
 * http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 */
function detectBrowser() {
    // Firefox 1.0+
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        return Browser.FIREFOX;
    }
    // Safari <= 9 "[object HTMLElementConstructor]"
    if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
        return Browser.WEBKIT;
    }
    // Internet Explorer 6-11
    if ( /* @cc_on!@*/false || !!document.documentMode) {
        return Browser.IE;
    }
    // Edge 20+
    if (!!window.StyleMedia) {
        return Browser.EDGE;
    }
    // Chrome 1+
    if (!!window.chrome && !!window.chrome.webstore) {
        return Browser.CHROME;
    }
    return Browser.UNKNOWN;
}
// see http://stackoverflow.com/questions/16802795/click-not-working-in-mocha-phantomjs-on-certain-elements
// tl;dr PhantomJS sucks so we have to manually create click events
function createMouseEvent(eventType, clientX, clientY) {
    if (eventType === void 0) { eventType = "click"; }
    if (clientX === void 0) { clientX = 0; }
    if (clientY === void 0) { clientY = 0; }
    var event = document.createEvent("MouseEvent");
    // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
    var detailArg = 0;
    switch (eventType) {
        case "click":
        case "dblclick":
            detailArg = 1;
            break;
        case "mouseup":
        case "mousedown":
            detailArg = 2;
            break;
    }
    // HACKHACK: see https://github.com/palantir/blueprint/issues/5173
    // eslint-disable-next-line deprecation/deprecation
    event.initMouseEvent(eventType, true /* bubble */, true /* cancelable */, window /* viewArg */, detailArg, 0, 0, clientX, clientY /* coordinates */, false, false, false, false /* modifier keys */, 0 /* left */, null);
    return event;
}
exports.createMouseEvent = createMouseEvent;
function dispatchMouseEvent(target, eventType, clientX, clientY) {
    if (eventType === void 0) { eventType = "click"; }
    if (clientX === void 0) { clientX = 0; }
    if (clientY === void 0) { clientY = 0; }
    target.dispatchEvent(createMouseEvent(eventType, clientX, clientY));
}
exports.dispatchMouseEvent = dispatchMouseEvent;
// PhantomJS doesn't support touch events yet https://github.com/ariya/phantomjs/issues/11571
// so we simulate it with mouse events
function createTouchEvent(eventType, clientX, clientY) {
    if (eventType === void 0) { eventType = "touchstart"; }
    if (clientX === void 0) { clientX = 0; }
    if (clientY === void 0) { clientY = 0; }
    var event = createMouseEvent(eventType, clientX, clientY);
    var touches = [{ clientX: clientX, clientY: clientY }];
    ["touches", "targetTouches", "changedTouches"].forEach(function (prop) {
        Object.defineProperty(event, prop, { value: touches });
    });
    return event;
}
exports.createTouchEvent = createTouchEvent;
function dispatchTouchEvent(target, eventType, clientX, clientY) {
    if (eventType === void 0) { eventType = "touchstart"; }
    if (clientX === void 0) { clientX = 0; }
    if (clientY === void 0) { clientY = 0; }
    target.dispatchEvent(createTouchEvent(eventType, clientX, clientY));
}
exports.dispatchTouchEvent = dispatchTouchEvent;
/**
 * Helper utility to test validateProps behavior.
 * We can't simply call mount() here since React 16 throws before we can even validate the errors thrown
 * in component constructors.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function expectPropValidationError(Component, props, errorMessage, assertionMessage) {
    var _a = Component.defaultProps, defaultProps = _a === void 0 ? {} : _a;
    // HACKHACK: weird casts ahead
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/consistent-type-assertions
    (0, chai_1.expect)(function () { return new Component(tslib_1.__assign(tslib_1.__assign({}, defaultProps), props)); }).to.throw(errorMessage, assertionMessage);
}
exports.expectPropValidationError = expectPropValidationError;
//# sourceMappingURL=utils.js.map