export declare const datetimeComponentsMigrationMapping: {
    DateInput: string;
    DateRangeInput: string;
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/datetime. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
export declare const noDeprecatedDatetimeComponentsRule: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"migration" | "migrationWithPropUsage", unknown[], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
