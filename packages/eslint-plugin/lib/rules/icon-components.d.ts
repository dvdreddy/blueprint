import { TSESLint } from "@typescript-eslint/utils";
export declare const OPTION_COMPONENT = "component";
export declare const OPTION_LITERAL = "literal";
declare type Options = ["component" | "literal"];
declare type MessageIds = "component" | "literal";
export declare const iconComponentsRule: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export {};
