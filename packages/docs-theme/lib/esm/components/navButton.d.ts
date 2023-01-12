import * as React from "react";
import { IconName } from "@blueprintjs/core";
export interface INavButtonProps {
    icon: IconName;
    hotkey: string;
    text: string;
    onClick: () => void;
}
export declare const NavButton: React.FC<INavButtonProps>;
