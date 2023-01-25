/// <reference types="react" />
import { IBlock } from "@documentalist/client";
import { TagRendererMap } from "../tags";
export declare function renderBlock(
/** the block to render */
block: IBlock | undefined, 
/** known tag renderers */
tagRenderers: TagRendererMap, 
/** class names to apply to element wrapping string content. */
textClassName?: string): JSX.Element | null;
