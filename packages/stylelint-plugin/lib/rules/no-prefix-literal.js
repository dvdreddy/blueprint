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
const postcss_selector_parser_1 = tslib_1.__importDefault(require("postcss-selector-parser"));
const stylelint_1 = tslib_1.__importDefault(require("stylelint"));
const checkImportExists_1 = require("../utils/checkImportExists");
const cssSyntax_1 = require("../utils/cssSyntax");
const insertImport_1 = require("../utils/insertImport");
const ruleName = "@blueprintjs/no-prefix-literal";
const messages = stylelint_1.default.utils.ruleMessages(ruleName, {
    expected: (unfixed, fixed) => `Use the \`${fixed}\` variable instead of the \`${unfixed}\` literal`,
});
const bannedPrefixes = ["bp3", "bp4"];
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
    root.walkRules(rule => {
        rule.selector = (0, postcss_selector_parser_1.default)(selectors => {
            selectors.walkClasses(selector => {
                for (const bannedPrefix of bannedPrefixes) {
                    if (!selector.value.startsWith(`${bannedPrefix}-`)) {
                        continue;
                    }
                    if (context.fix && !disableFix) {
                        assertBpVariablesImportExists(cssSyntax);
                        const fixed = cssSyntax_1.BpPrefixVariableMap[cssSyntax] + selector.value.substring(bannedPrefix.length);
                        // Note - selector.value = "#{$var}" escapes special characters and produces "\#\{\$var\}",
                        // and to work around that we use selector.toString instead.
                        selector.toString = () => `.${fixed}`;
                    }
                    else {
                        stylelint_1.default.utils.report({
                            // HACKHACK - offset by one because otherwise the error is reported at a wrong position
                            index: selector.sourceIndex + 1,
                            message: messages.expected(bannedPrefix, cssSyntax_1.BpPrefixVariableMap[cssSyntax]),
                            node: rule,
                            result,
                            ruleName,
                        });
                    }
                }
            });
        }).processSync(rule.selector);
    });
};
ruleImpl.ruleName = ruleName;
ruleImpl.messages = messages;
exports.default = stylelint_1.default.createPlugin(ruleName, ruleImpl);
//# sourceMappingURL=no-prefix-literal.js.map