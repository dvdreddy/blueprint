import { ITsTypeAlias } from "@documentalist/client";
import * as React from "react";
import { Props } from "@blueprintjs/core";
import { IDocumentationContext } from "../../common/context";
export interface ITypeAliasTableProps extends Props {
    data: ITsTypeAlias;
}
export declare class TypeAliasTable extends React.PureComponent<ITypeAliasTableProps> {
    static contextTypes: {
        getDocsData: <T>(obj: T, key: keyof T) => Error;
        renderBlock: <T>(obj: T, key: keyof T) => Error;
        renderType: <T>(obj: T, key: keyof T) => Error;
        renderViewSourceLinkText: <T>(obj: T, key: keyof T) => Error;
        showApiDocs: <T>(obj: T, key: keyof T) => Error;
    };
    static displayName: string;
    context: IDocumentationContext;
    render(): JSX.Element;
}
