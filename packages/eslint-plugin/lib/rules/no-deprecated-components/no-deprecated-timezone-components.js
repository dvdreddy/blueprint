"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedTimezoneComponentsRule = exports.timezoneComponentsMigrationMapping = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
exports.timezoneComponentsMigrationMapping = {
    TimezonePicker: "TimezoneSelect",
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/timezone. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
exports.noDeprecatedTimezoneComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-timezone-components", ["@blueprintjs/timezone"], exports.timezoneComponentsMigrationMapping);
//# sourceMappingURL=no-deprecated-timezone-components.js.map