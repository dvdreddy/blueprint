import { TSESLint, TSESTree } from "@typescript-eslint/utils";
/**
 * Return a function which when provided with a fixer will produce a RuleFix to replace the
 * specified `fromImportName` with `toImportName` from the specified `packageName` at the top of the file.
 */
export declare const replaceImportInFile: (program: TSESTree.Program, fromImportName: string, toImportName: string, packageName: string) => TSESLint.ReportFixFunction;
