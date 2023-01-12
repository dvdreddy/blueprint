import { Replacement } from "tslint";
import * as ts from "typescript";
export declare function addImportToFile(file: ts.SourceFile, imports: string[], packageName: string): Replacement;
