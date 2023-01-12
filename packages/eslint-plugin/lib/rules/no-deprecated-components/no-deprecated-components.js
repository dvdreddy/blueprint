"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedComponentsRule = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
const no_deprecated_core_components_1 = require("./no-deprecated-core-components");
const no_deprecated_datetime_components_1 = require("./no-deprecated-datetime-components");
const no_deprecated_select_components_1 = require("./no-deprecated-select-components");
const no_deprecated_table_components_1 = require("./no-deprecated-table-components");
const no_deprecated_timezone_components_1 = require("./no-deprecated-timezone-components");
/**
 * This rule checks a hardcoded list of components that Blueprint is actively migrating to a newer version (e.g. v1 -> v2)
 * If deprecated versions (v1) are detected, it will recommend using the replacement component (e.g. the v2) instead.
 * Note that this does not rely on the @deprecated JSDoc annotation, and is thus distinct/very different from the
 * deprecated/deprecated ESLint rule
 */
exports.noDeprecatedComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-components", [
    "@blueprintjs/core",
    "@blueprintjs/datetime",
    "@blueprintjs/select",
    "@blueprintjs/table",
    "@blueprintjs/timezone",
], Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, no_deprecated_core_components_1.coreComponentsMigrationMapping), no_deprecated_datetime_components_1.datetimeComponentsMigrationMapping), no_deprecated_select_components_1.selectComponentsMigrationMapping), no_deprecated_table_components_1.tableComponentsMigrationMapping), no_deprecated_timezone_components_1.timezoneComponentsMigrationMapping));
//# sourceMappingURL=no-deprecated-components.js.map