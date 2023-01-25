import * as React from "react";
export interface ITestErrorBoundaryProps {
    children?: React.ReactNode;
    expectedErrorString: string;
}
export interface ITestErrorBoundaryState {
    didCatch: boolean;
}
/**
 * Use this component when you want to validate component errors _during the component lifecycle_.
 * Note that this is not useful in validating errors thrown in component constructors.
 */
export declare class TestErrorBoundary extends React.Component<ITestErrorBoundaryProps, ITestErrorBoundaryState> {
    state: {
        didCatch: boolean;
    };
    componentDidCatch(error: Error, _info: any): void;
    render(): React.ReactNode;
}
