import { MouseEventHandler } from "react";
/** @deprecated use ItemModifiers */
export declare type IItemModifiers = ItemModifiers;
export interface ItemModifiers {
    /** Whether this is the "active" (focused) item, meaning keyboard interactions will act upon it. */
    active: boolean;
    /** Whether this item is disabled and should ignore interactions. */
    disabled: boolean;
    /** Whether this item matches the predicate. A typical renderer could hide `false` values. */
    matchesPredicate: boolean;
}
/** @deprecated use ItemRendererProps */
export declare type IItemRendererProps = ItemRendererProps;
/**
 * An object describing how to render a particular item.
 * An `itemRenderer` receives the item as its first argument, and this object as its second argument.
 */
export interface ItemRendererProps {
    /** Click event handler to select this item. */
    handleClick: MouseEventHandler<HTMLElement>;
    /**
     * Focus event handler to set this as the "active" item.
     *
     * N.B. this is optional to preserve back-compat; it will become required in the next major version.
     */
    handleFocus?: () => void;
    index?: number;
    /** Modifiers that describe how to render this item, such as `active` or `disabled`. */
    modifiers: ItemModifiers;
    /** The current query string used to filter the items. */
    query: string;
}
/** Type alias for a function that receives an item and props and renders a JSX element (or `null`). */
export declare type ItemRenderer<T> = (item: T, itemProps: ItemRendererProps) => JSX.Element | null;
