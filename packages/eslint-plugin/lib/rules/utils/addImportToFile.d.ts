import { TSESLint, TSESTree } from "@typescript-eslint/utils";
/**
 * Return a function which when provided with a fixer will produce a RuleFix to add the
 * specified imports from the specified packageName at the top of the file (in alphabetical order)
 */
export declare const addImportToFile: (program: TSESTree.Program, imports: string[], packageName: string) => TSESLint.ReportFixFunction;
