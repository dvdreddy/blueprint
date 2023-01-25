import { IPageData } from "@documentalist/client";
import * as React from "react";
import { TagRendererMap } from "../tags";
export interface IPageProps {
    page: IPageData;
    renderActions: (page: IPageData) => React.ReactNode;
    tagRenderers: TagRendererMap;
}
export declare const Page: React.FC<IPageProps>;
