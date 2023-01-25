import { IHeadingNode, IPageNode } from "@documentalist/client";
import * as React from "react";
export declare type NavMenuItemProps = INavMenuItemProps;
/** @deprecated use NavMenuItemProps */
export interface INavMenuItemProps {
    children?: React.ReactNode;
    /** CSS classes to apply to the root element, for proper appearance in the tree. */
    className: string;
    /** Link URL. */
    href: string;
    /** Whether this item is the active section (currently being viewed) */
    isActive: boolean;
    /** Whether this section is expanded (it or a child is being viewed) */
    isExpanded: boolean;
    /** Click handler for item, to navigate to URL. */
    onClick: () => void;
    /** The section for this menu item, either a page or a heading node. */
    section: IPageNode | IHeadingNode;
}
export declare const NavMenuItem: React.FC<NavMenuItemProps>;
