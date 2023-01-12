"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedDatetimeComponentsRule = exports.datetimeComponentsMigrationMapping = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
exports.datetimeComponentsMigrationMapping = {
    DateInput: "DateInput2",
    DateRangeInput: "DateRangeInput2",
    // TODO(@adidahiya): Blueprint v6
    // DateTimePicker: "DatePicker",
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/datetime. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
exports.noDeprecatedDatetimeComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-datetime-components", ["@blueprintjs/datetime"], exports.datetimeComponentsMigrationMapping);
//# sourceMappingURL=no-deprecated-datetime-components.js.map