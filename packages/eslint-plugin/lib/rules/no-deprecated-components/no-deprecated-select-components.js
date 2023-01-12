"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedSelectComponentsRule = exports.selectComponentsMigrationMapping = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
exports.selectComponentsMigrationMapping = {
    MultiSelect: "MultiSelect2",
    Select: "Select2",
    Suggest: "Suggest2",
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/select. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
exports.noDeprecatedSelectComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-select-components", ["@blueprintjs/select"], exports.selectComponentsMigrationMapping);
//# sourceMappingURL=no-deprecated-select-components.js.map