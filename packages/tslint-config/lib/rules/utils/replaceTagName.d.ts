import { Replacement } from "tslint";
import { JsxTagNameExpression } from "typescript";
/** Replace the name of a JSX tag. */
export declare function replaceTagName(tagName: JsxTagNameExpression, newTagName: string): Replacement;
