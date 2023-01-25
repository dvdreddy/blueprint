import { Root } from "postcss";
import type { PluginContext } from "stylelint";
import { CssSyntax } from "./cssSyntax";
/**
 * Adds an import statement to the file. The import is inserted below the existing imports, and if there are
 * no imports present then it's inserted at the top of the file (but below any copyright headers).
 */
export declare function insertImport(cssSyntaxType: CssSyntax.SASS | CssSyntax.LESS, root: Root, context: PluginContext, importPath: string, namespace?: string): void;
