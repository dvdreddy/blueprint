export declare enum CssSyntax {
    SASS = "sass",
    LESS = "less",
    OTHER = "other"
}
export declare const CssExtensionMap: Record<Exclude<CssSyntax, CssSyntax.OTHER>, string>;
export declare const BpVariablePrefixMap: Record<Exclude<CssSyntax, CssSyntax.OTHER>, string>;
export declare const BpSassNamespace = "bp";
export declare const BpPrefixVariableMap: Record<Exclude<CssSyntax, CssSyntax.OTHER>, string>;
export declare const BpVariableImportMap: Record<Exclude<CssSyntax, CssSyntax.OTHER>, string>;
/**
 * Returns the flavor of the CSS we're dealing with.
 */
export declare function getCssSyntax(fileName: string): CssSyntax;
export declare const isCssSyntaxToStringMap: (obj: unknown) => obj is {
    sass?: string | undefined;
    less?: string | undefined;
    other?: string | undefined;
};
