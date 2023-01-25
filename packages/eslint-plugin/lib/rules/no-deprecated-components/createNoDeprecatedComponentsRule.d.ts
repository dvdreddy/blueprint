import { TSESLint } from "@typescript-eslint/utils";
declare type MessageIds = "migration" | "migrationWithPropUsage";
/**
 * Higher-order function to create an ESLint rule which checks for usage of deprecated React components in JSX syntax.
 *
 * @param packagesToCheck Only components imported from these packages will be flagged.
 *
 * @param deprecatedComponentConfig Configuration of the deprecated components to lint for. Note that this configuration
 *  is not exposed to lint rule users, it just lives inside our rule implementations. Lint violations will include a
 *  recommendation to migrate to the newer, non-deprecated component specified in this mapping. Keys-value pairs may use
 *  one of two syntaxes:
 *      - "ComponentV1": "ComponentV2" - Usage of <ComponentV1> will be flagged with a recommendation
 *          to migrate to <ComponentV2>
 *      - "ComponentV1.propName": "ComponentV2" - Usage of <ComponentV1 propName={...}> will be flagged with a
 *          recommendation to migrate to <ComponentV2>
 */
export declare function createNoDeprecatedComponentsRule(ruleName: string, packagesToCheck: string[], deprecatedComponentConfig: Record<string, string>): TSESLint.RuleModule<MessageIds, unknown[]>;
export {};
