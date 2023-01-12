"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
const tslib_1 = require("tslib");
const postcss_value_parser_1 = tslib_1.__importDefault(require("postcss-value-parser"));
const stylelint_1 = tslib_1.__importDefault(require("stylelint"));
const colors_1 = require("@blueprintjs/colors");
const checkImportExists_1 = require("../utils/checkImportExists");
const cssSyntax_1 = require("../utils/cssSyntax");
const hexColor_1 = require("../utils/hexColor");
const insertImport_1 = require("../utils/insertImport");
const ruleName = "@blueprintjs/no-color-literal";
const messages = stylelint_1.default.utils.ruleMessages(ruleName, {
    expected: (unfixed, fixed) => `Use the \`${fixed}\` variable instead of the \`${unfixed}\` literal`,
});
const ruleImpl = (enabled, options, context) => (root, result) => {
    var _a, _b;
    if (!enabled) {
        return;
    }
    const validOptions = stylelint_1.default.utils.validateOptions(result, ruleName, {
        actual: enabled,
        optional: false,
        possible: [true, false],
    }, {
        actual: options,
        optional: true,
        possible: {
            disableFix: [true, false],
            variablesImportPath: [cssSyntax_1.isCssSyntaxToStringMap],
        },
    });
    if (!validOptions) {
        return;
    }
    const disableFix = (_a = options === null || options === void 0 ? void 0 : options.disableFix) !== null && _a !== void 0 ? _a : false;
    const cssSyntax = (0, cssSyntax_1.getCssSyntax)(((_b = root.source) === null || _b === void 0 ? void 0 : _b.input.file) || "");
    if (cssSyntax === cssSyntax_1.CssSyntax.OTHER) {
        return;
    }
    let hasBpVariablesImport; // undefined means not checked yet
    function assertBpVariablesImportExists(cssSyntaxType) {
        var _a, _b;
        const importPath = (_b = (_a = options === null || options === void 0 ? void 0 : options.variablesImportPath) === null || _a === void 0 ? void 0 : _a[cssSyntaxType]) !== null && _b !== void 0 ? _b : cssSyntax_1.BpVariableImportMap[cssSyntaxType];
        if (hasBpVariablesImport == null) {
            hasBpVariablesImport = (0, checkImportExists_1.checkImportExists)(cssSyntaxType, root, importPath, cssSyntax_1.BpSassNamespace);
        }
        if (!hasBpVariablesImport) {
            (0, insertImport_1.insertImport)(cssSyntaxType, root, context, importPath, cssSyntax_1.BpSassNamespace);
            hasBpVariablesImport = true;
        }
    }
    root.walkDecls(decl => {
        let needsFix = false;
        const parsedValue = (0, postcss_value_parser_1.default)(decl.value);
        parsedValue.walk(node => {
            var _a;
            const value = node.value;
            const type = node.type;
            if (type !== "word" || !(0, hexColor_1.isHexColor)(value)) {
                return;
            }
            const cssVar = getCssColorVariable(value, cssSyntax);
            if (cssVar == null) {
                return;
            }
            if (context.fix && !disableFix) {
                assertBpVariablesImportExists(cssSyntax);
                node.value = `${cssSyntax_1.BpSassNamespace}.${cssVar}`;
                needsFix = true;
            }
            else {
                const message = typeof messages.expected === "string" ? messages.expected : (_a = messages.expected) === null || _a === void 0 ? void 0 : _a.call(messages, value, cssVar);
                stylelint_1.default.utils.report({
                    index: declarationValueIndex(decl) + node.sourceIndex,
                    message,
                    node: decl,
                    result,
                    ruleName,
                });
            }
        });
        if (needsFix) {
            decl.value = parsedValue.toString();
        }
    });
};
ruleImpl.ruleName = ruleName;
ruleImpl.messages = messages;
exports.default = stylelint_1.default.createPlugin(ruleName, ruleImpl);
function declarationValueIndex(decl) {
    const beforeColon = decl.toString().indexOf(":");
    const afterColon = decl.raw("between").length - decl.raw("between").indexOf(":");
    return beforeColon + afterColon;
}
function getHexToColorName() {
    const ret = {};
    for (const [name, hex] of Object.entries(colors_1.Colors)) {
        ret[(0, hexColor_1.normalizeHexColor)(hex)] = name;
    }
    return ret;
}
const hexToColorName = getHexToColorName();
/**
 * Returns a CSS color variable for a given hex color, or undefined if one doesn't exist.
 */
function getCssColorVariable(hexColor, cssSyntax) {
    const normalizedHex = (0, hexColor_1.normalizeHexColor)(hexColor);
    if (hexToColorName[normalizedHex] == null) {
        return undefined;
    }
    return cssSyntax_1.BpVariablePrefixMap[cssSyntax] + hexToColorName[normalizedHex].toLocaleLowerCase().split("_").join("-");
}
//# sourceMappingURL=no-color-literal.js.map