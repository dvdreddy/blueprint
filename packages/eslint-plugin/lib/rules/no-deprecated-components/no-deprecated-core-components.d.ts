export declare const coreComponentsMigrationMapping: {
    AbstractComponent: string;
    AbstractPureComponent: string;
    Breadcrumbs: string;
    CollapsibleList: string;
    "MenuItem.popoverProps": string;
    Popover: string;
    Tooltip: string;
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/core. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
export declare const noDeprecatedCoreComponentsRule: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"migration" | "migrationWithPropUsage", unknown[], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
