import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
/**
 * Return the top level node that is the greatest parent of the current node, if it is a Program.
 * Non-program top level parents return undefined.
 */
export declare function getProgram(node: TSESTree.BaseNode & {
    type: AST_NODE_TYPES;
}): TSESTree.Program | undefined;
