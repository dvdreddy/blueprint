"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Generates isomorphic tests for React components.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIsomorphicTests = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("assert");
var Enzyme = tslib_1.__importStar(require("enzyme"));
var React = tslib_1.__importStar(require("react"));
function isReactClass(Component) {
    return (typeof Component !== "undefined" &&
        typeof Component.prototype !== "undefined" &&
        typeof Component.prototype.constructor !== "undefined" &&
        typeof Component.prototype.render !== "undefined");
}
/**
 * Tests that each ComponentClass in Components can be isomorphically rendered on the server.
 */
function generateIsomorphicTests(
/** Namespace import of all components to test. */
Components, 
/** Configuration per component. This is a mapped type supporting all keys in `Components`. */
config) {
    if (config === void 0) { config = {}; }
    function render(name, extraProps) {
        var _a = config[name] || {}, children = _a.children, props = _a.props;
        var finalProps = extraProps ? tslib_1.__assign(tslib_1.__assign({}, props), extraProps) : props;
        // Render to static HTML, just as a server would.
        // We care merely that `render()` succeeds: it can be server-rendered.
        // Errors will fail the test and log full stack traces to the console. Nifty!
        var element = React.createElement(Components[name], finalProps, children);
        return Enzyme.render(element);
    }
    Object.keys(Components)
        .sort()
        .filter(function (name) { return isReactClass(Components[name]); })
        .forEach(function (componentName) {
        var _a = config[componentName] || {}, className = _a.className, skip = _a.skip;
        if (skip) {
            it.skip("<".concat(componentName, ">"));
            return;
        }
        it("<".concat(componentName, ">"), function () { return render(componentName); });
        if (className === false) {
            it.skip("<".concat(componentName, " className>"));
        }
        else {
            it("<".concat(componentName, " className>"), function () {
                var testClass = "test-test-test";
                var doc = render(componentName, { className: testClass });
                (0, assert_1.strictEqual)(doc.find(".".concat(testClass)).length + doc.filter(".".concat(testClass)).length, 1);
            });
        }
    });
}
exports.generateIsomorphicTests = generateIsomorphicTests;
//# sourceMappingURL=generateIsomorphicTests.js.map