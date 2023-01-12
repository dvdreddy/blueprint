import * as React from "react";
export interface ISlowLayoutStackProps {
    children?: React.ReactNode;
    /**
     * The number of levels in the stack
     */
    depth: number;
    /**
     * A switch to turn on/off the stack. If disabled this components children
     * will be added to a single `<div>` with the `rootClassName` class.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * The classname applied to the top `<div>` of the stack
     */
    rootClassName?: string;
    /**
     * The classname applied to each branch `<div>` below the root in the stack
     */
    branchClassName?: string;
}
/**
 * Wraps children in a stack of `<div>`s.
 *
 * For example:
 * ```
 * <SlowLayoutStack depth={3}>Hello!</SlowLayoutStack>
 * ```
 * becomes:
 * ```
 * <div>
 *    <div>
 *      <div>
 *          Hello!
 *      </div>
 *    </div>
 * </div>
 * ```
 *
 * This is useful for performance testing since adding a very deep stack can
 * make native browser layout and reflow extremely slow. This mimics a variety
 * of real world performance issues in a controllable way.
 *
 * In order to ensure slowness, the classes in the stack should not create
 * non-static roots or layout boundaries. See:
 * http://wilsonpage.co.uk/introducing-layout-boundaries/
 *
 * To mimic slowness in the native "Update Layer Tree", try: `overflow: auto`.
 */
export declare class SlowLayoutStack extends React.Component<ISlowLayoutStackProps> {
    render(): JSX.Element;
}
