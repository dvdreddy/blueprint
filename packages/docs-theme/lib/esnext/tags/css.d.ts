import { ITag } from "@documentalist/client";
import * as React from "react";
import { IDocumentationContext } from "../common/context";
export interface ICssExampleState {
    modifiers: Set<string>;
}
export declare class CssExample extends React.PureComponent<ITag> {
    static contextTypes: {
        getDocsData: <T>(obj: T, key: keyof T) => Error;
        renderBlock: <T>(obj: T, key: keyof T) => Error;
        renderType: <T>(obj: T, key: keyof T) => Error;
        renderViewSourceLinkText: <T>(obj: T, key: keyof T) => Error;
        showApiDocs: <T>(obj: T, key: keyof T) => Error;
    };
    static displayName: string;
    context: IDocumentationContext | undefined;
    state: ICssExampleState;
    render(): JSX.Element;
    private getModifierToggleHandler;
    private renderExample;
    private getModifiers;
}
