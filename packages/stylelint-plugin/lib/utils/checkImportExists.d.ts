import type { Root } from "postcss";
import { CssSyntax } from "./cssSyntax";
/**
 * Returns true if the given import exists in the file, otherwise returns false.
 * If `importPath` is an array, any of the strings has to match in order fortrue to be returned.
 */
export declare function checkImportExists(cssSyntaxType: CssSyntax.SASS | CssSyntax.LESS, root: Root, importPath: string, namespace?: string): boolean;
