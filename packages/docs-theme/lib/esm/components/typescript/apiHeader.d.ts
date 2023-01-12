import { ITsDocBase } from "@documentalist/client";
import * as React from "react";
import { IDocumentationContext } from "../../common/context";
interface ApiHeaderProps extends ITsDocBase {
    children?: React.ReactNode;
}
export declare class ApiHeader extends React.PureComponent<ApiHeaderProps> {
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
    private renderInheritance;
}
export {};
