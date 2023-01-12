import * as React from "react";
export interface INavProps {
    selected: "index" | "features";
}
export declare class Nav extends React.PureComponent<INavProps> {
    render(): JSX.Element;
    private handleToggleDarkTheme;
}
