"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDeprecatedCoreComponentsRule = exports.coreComponentsMigrationMapping = void 0;
const createNoDeprecatedComponentsRule_1 = require("./createNoDeprecatedComponentsRule");
exports.coreComponentsMigrationMapping = {
    AbstractComponent: "AbstractComponent2",
    AbstractPureComponent: "AbstractPureComponent2",
    Breadcrumbs: "Breadcrumbs2",
    CollapsibleList: "OverflowList",
    "MenuItem.popoverProps": "MenuItem2",
    // TODO(@adidahiya): Blueprint v6
    // PanelStack: "PanelStack2",
    Popover: "Popover2",
    Tooltip: "Tooltip2",
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/core. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
exports.noDeprecatedCoreComponentsRule = (0, createNoDeprecatedComponentsRule_1.createNoDeprecatedComponentsRule)("no-deprecated-core-components", ["@blueprintjs/core"], exports.coreComponentsMigrationMapping);
//# sourceMappingURL=no-deprecated-core-components.js.map