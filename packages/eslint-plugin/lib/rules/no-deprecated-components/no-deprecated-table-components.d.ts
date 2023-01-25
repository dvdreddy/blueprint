export declare const tableComponentsMigrationMapping: {
    JSONFormat: string;
    TruncatedFormat: string;
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/table. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
export declare const noDeprecatedTableComponentsRule: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"migration" | "migrationWithPropUsage", unknown[], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
