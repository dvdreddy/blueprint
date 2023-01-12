export declare const timezoneComponentsMigrationMapping: {
    TimezonePicker: string;
};
/**
 * This rule is similar to "@blueprintjs/no-deprecated-components", but it only checks for usage
 * of deprecated components from @blueprintjs/timezone. This is useful for incremental migration to
 * newer Blueprint APIs.
 */
export declare const noDeprecatedTimezoneComponentsRule: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"migration" | "migrationWithPropUsage", unknown[], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
