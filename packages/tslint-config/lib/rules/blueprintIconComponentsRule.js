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
exports.Rule = void 0;
var tslib_1 = require("tslib");
var Lint = tslib_1.__importStar(require("tslint"));
var ts = tslib_1.__importStar(require("typescript"));
var OPTION_COMPONENT = "component";
var OPTION_LITERAL = "literal";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var _a = this.ruleArguments[0], option = _a === void 0 ? OPTION_COMPONENT : _a;
        return this.applyWithFunction(sourceFile, walk, option);
    };
    Rule.metadata = {
        ruleName: "blueprint-icon-components",
        // tslint:disable-next-line:object-literal-sort-keys
        description: "Enforce usage of JSX Icon components over IconName string literals (or vice-versa)",
        options: {
            items: [{ enum: [OPTION_COMPONENT, OPTION_LITERAL], type: "string" }],
            maxLength: 1,
            minLength: 0,
            type: "array",
        },
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Accepts one option which can be either of the following values:\n            * `\"", "\"` (default) requires JSX Icon components for `icon` props.\n            * `\"", "\"` requires `IconName` string literals for `icon` props.\n            A fixer is available for `\"", "\"` that converts a string literal to the corresponding component."], ["\n            Accepts one option which can be either of the following values:\n            * \\`\"", "\"\\` (default) requires JSX Icon components for \\`icon\\` props.\n            * \\`\"", "\"\\` requires \\`IconName\\` string literals for \\`icon\\` props.\n            A fixer is available for \\`\"", "\"\\` that converts a string literal to the corresponding component."])), OPTION_COMPONENT, OPTION_LITERAL, OPTION_COMPONENT),
        optionExamples: ["true", "false", "[true, \"".concat(OPTION_COMPONENT, "\"]"), "[true, \"".concat(OPTION_LITERAL, "\"]")],
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.componentMessage = function (component) { return "Replace icon literal with component: ".concat(component); };
    Rule.literalMessage = function (literal) { return "Replace icon component with literal: ".concat(literal); };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (ts.isJsxAttribute(node) && node.name.text === "icon") {
            var initializer = node.initializer;
            var option = ctx.options;
            if (initializer === undefined) {
                // no-op
            }
            else if (ts.isStringLiteral(initializer) && option === OPTION_COMPONENT) {
                // "tick" -> <TickIcon />
                var iconName = "<".concat(pascalCase(initializer.text), "Icon />");
                addFailure(ctx, node, Rule.componentMessage(iconName), "{".concat(iconName, "}"));
            }
            else if (ts.isJsxExpression(initializer) && option === OPTION_LITERAL) {
                // <TickIcon /> -> "tick"
                var match = /<(\w+)Icon /.exec(initializer.getText());
                if (match != null) {
                    var message = Rule.literalMessage("\"".concat(dashCase(match[1]), "\""));
                    addFailure(ctx, node, message, message);
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function addFailure(ctx, node, message, replacement) {
    var offsetLength = "icon=".length;
    var start = node.getStart(ctx.sourceFile) + offsetLength;
    var width = node.getWidth(ctx.sourceFile) - offsetLength;
    var fixer = replacement == null ? undefined : new Lint.Replacement(start, width, replacement);
    ctx.addFailureAt(start, width, message, fixer);
}
/** "MultiWordPhrase" => "multi-word-phrase" */
function dashCase(text) {
    return text.replace(/[A-Z]/g, function (match) { return "-".concat(match.toLowerCase()); }).replace(/^-+/, "");
}
/** "multi-word-phrase" => "MultiWordPhrase" */
function pascalCase(text) {
    return text
        .split("-")
        .map(function (s) { return s[0].toUpperCase() + s.slice(1).toLowerCase(); })
        .join("");
}
var templateObject_1;
//# sourceMappingURL=blueprintIconComponentsRule.js.map