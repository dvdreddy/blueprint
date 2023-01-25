import { IHeadingNode, IPageData, IPageNode, ITsDocBase } from "@documentalist/client";
import * as React from "react";
import { Props } from "@blueprintjs/core";
import { IDocsData, IDocumentationContext } from "../common/context";
import { TagRendererMap } from "../tags";
import { NavMenuItemProps } from "./navMenuItem";
export interface IDocumentationProps extends Props {
    /**
     * An element to place above the documentation, along the top of the viewport.
     * For best results, use a `Banner` from this package.
     */
    banner?: JSX.Element;
    /**
     * Default page to render in the absence of a hash route.
     */
    defaultPageId: string;
    /**
     * All the docs data from Documentalist.
     * This theme requires the Markdown plugin, and optionally supports Typescript and KSS data.
     */
    docs: IDocsData;
    /**
     * Elements to render on the bottom of the sidebar, below the nav menu.
     * This typically contains copyright information.
     */
    footer?: React.ReactNode;
    /**
     * Elements to render on the top of the sidebar, above the search box.
     * This typically contains logo, title and navigation links.
     * Use `.docs-nav-title` on an element for proper padding relative to other sidebar elements.
     */
    header: React.ReactNode;
    /**
     * Callback invoked to determine if given nav node should *not* be
     * searchable in the navigator. Returning `true` will exclude the item from
     * the navigator search results.
     */
    navigatorExclude?: (node: IPageNode | IHeadingNode) => boolean;
    /**
     * Callback invoked whenever the component props or state change (specifically,
     * called in `componentDidMount` and `componentDidUpdate`).
     * Use it to run non-React code on the newly rendered sections.
     */
    onComponentUpdate?: (pageId: string) => void;
    /**
     * Callback invoked to render "View source" links in Typescript interfaces.
     * The `href` of the link will be `entry.sourceUrl`.
     *
     * @default "View source"
     */
    renderViewSourceLinkText?: (entry: ITsDocBase) => React.ReactNode;
    /**
     * Callback invoked to render the clickable nav menu items. (Nested menu structure is handled by the library.)
     * The default implementation renders a `NavMenuItem` element, which is exported from this package.
     */
    renderNavMenuItem?: (props: NavMenuItemProps) => JSX.Element;
    /**
     * Callback invoked to render actions for a documentation page.
     * Actions appear in an element in the upper-right corner of the page.
     */
    renderPageActions?: (page: IPageData) => React.ReactNode;
    /**
     * HTML element to use as the scroll parent. By default `document.documentElement` is assumed to be the scroll container.
     *
     * @default document.documentElement
     */
    scrollParent?: HTMLElement;
    /** Tag renderer functions. Unknown tags will log console errors. */
    tagRenderers: TagRendererMap;
}
export interface IDocumentationState {
    activeApiMember: string;
    activePageId: string;
    activeSectionId: string;
    isApiBrowserOpen: boolean;
    isNavigatorOpen: boolean;
}
export declare class Documentation extends React.PureComponent<IDocumentationProps, IDocumentationState> {
    static childContextTypes: {
        getDocsData: <T>(obj: T, key: keyof T) => Error; /**
         * Callback invoked to render the clickable nav menu items. (Nested menu structure is handled by the library.)
         * The default implementation renders a `NavMenuItem` element, which is exported from this package.
         */
        renderBlock: <T>(obj: T, key: keyof T) => Error;
        renderType: <T>(obj: T, key: keyof T) => Error;
        renderViewSourceLinkText: <T>(obj: T, key: keyof T) => Error;
        showApiDocs: <T>(obj: T, key: keyof T) => Error;
    };
    /** Map of section route to containing page reference. */
    private routeToPage;
    private contentElement;
    private navElement;
    private refHandlers;
    constructor(props: IDocumentationProps);
    getChildContext(): IDocumentationContext;
    render(): JSX.Element;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(_prevProps: IDocumentationProps, prevState: IDocumentationState): void;
    private updateHash;
    private handleHashChange;
    private handleCloseNavigator;
    private handleOpenNavigator;
    private handleNavigation;
    private handleNextSection;
    private handlePreviousSection;
    private handleScroll;
    private maybeScrollToActivePageMenuItem;
    private scrollToActiveSection;
    private shiftSection;
    private handleApiBrowserOpen;
    private handleApiBrowserClose;
}
