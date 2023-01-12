import * as React from "react";
import { Props } from "@blueprintjs/core";
import { IDocumentationContext } from "../../common/context";
export interface IApiLinkProps extends Props {
    children?: never;
    name: string;
}
/**
 * Renders a link to open a symbol in the API Browser.
 */
export declare class ApiLink extends React.PureComponent<IApiLinkProps> {
    static contextTypes: {
        getDocsData: <T>(obj: T, key: keyof T) => Error;
        renderBlock: <T>(obj: T, key: keyof T) => Error;
        renderType: <T>(obj: T, key: keyof T) => Error;
        renderViewSourceLinkText: <T>(obj: T, key: keyof T) => Error;
        showApiDocs: <T>(obj: T, key: keyof T) => Error;
    };
    context: IDocumentationContext;
    render(): JSX.Element;
    private handleClick;
}
