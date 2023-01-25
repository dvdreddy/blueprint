import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export declare type MenuProps = IMenuProps;
/** @deprecated use MenuProps */
export interface IMenuProps extends Props, React.HTMLAttributes<HTMLUListElement> {
    /** Menu items. */
    children?: React.ReactNode;
    /** Whether the menu items in this menu should use a large appearance. */
    large?: boolean;
    /** Ref handler that receives the HTML `<ul>` element backing this component. */
    ulRef?: React.Ref<HTMLUListElement>;
}
export declare class Menu extends AbstractPureComponent2<MenuProps> {
    static displayName: string;
    render(): JSX.Element;
}
