import * as Lint from "tslint";
import * as ts from "typescript";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static componentMessage: (component: string) => string;
    static literalMessage: (literal: string) => string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
