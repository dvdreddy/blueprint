"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedTableComponentsRule = exports.tableComponentsMigrationMapping = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
exports.tableComponentsMigrationMapping = {
    JSONFormat: "JSONFormat2",
    TruncatedFormat: "TruncatedFormat2",
    // TODO(@adidahiya): Blueprint v6
    // ColumnHeaderCell: "ColumnHeaderCell2",
    // EditableCell: "EditableCell2",
    // RowHeaderCell: "RowHeaderCell2",
    // Table: "Table2",
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/table. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
exports.noDeprecatedTableComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-table-components", ["@blueprintjs/table"], exports.tableComponentsMigrationMapping);
//# sourceMappingURL=no-deprecated-table-components.js.map