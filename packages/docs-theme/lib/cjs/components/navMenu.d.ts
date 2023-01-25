import { IHeadingNode, IPageNode } from "@documentalist/client";
import * as React from "react";
import { Props } from "@blueprintjs/core";
import { NavMenuItemProps } from "./navMenuItem";
export interface INavMenuProps extends Props {
    activePageId: string;
    activeSectionId: string;
    level: number;
    onItemClick: (reference: string) => void;
    items: Array<IPageNode | IHeadingNode>;
    renderNavMenuItem?: (props: NavMenuItemProps) => JSX.Element;
}
export declare const NavMenu: React.FC<INavMenuProps>;
