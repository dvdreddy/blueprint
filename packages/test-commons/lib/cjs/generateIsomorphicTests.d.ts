import * as React from "react";
export interface IIsomorphicTestConfig {
    /** Required `children` for successful render. */
    children?: React.ReactNode;
    /** Whether to test `className`. */
    className?: boolean;
    /** Required `props` for successful render. */
    props?: Record<string, unknown>;
    /** Whether to skip this component entirely. */
    skip?: boolean;
}
/**
 * Tests that each ComponentClass in Components can be isomorphically rendered on the server.
 */
export declare function generateIsomorphicTests<T extends {
    [name: string]: any;
}>(
/** Namespace import of all components to test. */
Components: T, 
/** Configuration per component. This is a mapped type supporting all keys in `Components`. */
config?: {
    [P in keyof T]?: IIsomorphicTestConfig;
}): void;
