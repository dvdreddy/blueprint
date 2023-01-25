/// <reference types="react" />
import { ITag } from "@documentalist/client";
export declare type TagRendererMap = ITagRendererMap;
/** @deprecated use TagRendererMap */
export interface ITagRendererMap {
    [tagName: string]: React.ComponentType<ITag> | undefined;
}
export * from "./css";
export * from "./defaults";
export * from "./heading";
export * from "./method";
export * from "./reactDocs";
export * from "./reactExample";
export * from "./see";
export * from "./typescript";
