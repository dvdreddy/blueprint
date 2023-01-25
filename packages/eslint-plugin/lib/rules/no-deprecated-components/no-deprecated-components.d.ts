/**
 * This rule checks a hardcoded list of components that Blueprint is actively migrating to a newer version (e.g. v1 -> v2)
 * If deprecated versions (v1) are detected, it will recommend using the replacement component (e.g. the v2) instead.
 * Note that this does not rely on the @deprecated JSDoc annotation, and is thus distinct/very different from the
 * deprecated/deprecated ESLint rule
 */
export declare const noDeprecatedComponentsRule: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"migration" | "migrationWithPropUsage", unknown[], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
