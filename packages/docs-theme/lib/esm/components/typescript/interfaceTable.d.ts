import { ITsClass, ITsInterface } from "@documentalist/client";
import * as React from "react";
import { Props } from "@blueprintjs/core";
import { IDocumentationContext } from "../../common/context";
export declare type Renderer<T> = (props: T) => React.ReactNode;
export interface IInterfaceTableProps extends Props {
    data: ITsClass | ITsInterface;
    title: string;
}
export declare class InterfaceTable extends React.PureComponent<IInterfaceTableProps> {
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
    private renderPropRow;
    private renderIndexSignature;
    private renderTags;
}
