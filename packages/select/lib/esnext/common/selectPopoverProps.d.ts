/// <reference types="react" />
import type { Popover2, Popover2Props } from "@blueprintjs/popover2";
/**
 * Reusable collection of props for components in this package which render a `Popover2`
 * and need to provide some degree of customization for that popover.
 */
export interface SelectPopoverProps {
    /** Props to spread to `Popover2` content wrapper eleemnt. */
    popoverContentProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Props to spread to `Popover2`.
     * Note that `content` cannot be changed aside from utilizing `popoverContentProps`.
     */
    popoverProps?: Partial<Omit<Popover2Props, "content" | "defaultIsOpen" | "disabled" | "fill" | "renderTarget" | "targetTagName">>;
    /**
     * Optional ref for the Popover2 component instance.
     * This is sometimes useful to reposition the popover.
     */
    popoverRef?: React.RefObject<Popover2<React.HTMLProps<HTMLDivElement>>>;
}
