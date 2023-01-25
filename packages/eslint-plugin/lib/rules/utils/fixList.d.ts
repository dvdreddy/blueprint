import { TSESLint } from "@typescript-eslint/utils";
declare type RuleFix = TSESLint.RuleFix;
export declare class FixList {
    private fixes;
    getFixes(): TSESLint.RuleFix[];
    addFixes(fixes: null | RuleFix | readonly RuleFix[] | IterableIterator<RuleFix>): void;
}
export {};
