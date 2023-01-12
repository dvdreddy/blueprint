/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { isPageNode, linkify } from "@documentalist/client";
import classNames from "classnames";
import * as React from "react";
import { Classes, Drawer, FocusStyleManager, HotkeysTarget2 } from "@blueprintjs/core";
import { DocumentationContextTypes, hasTypescriptData } from "../common/context";
import { eachLayoutNode } from "../common/utils";
import { TypescriptExample } from "../tags";
import { renderBlock } from "./block";
import { NavButton } from "./navButton";
import { Navigator } from "./navigator";
import { NavMenu } from "./navMenu";
import { Page } from "./page";
import { addScrollbarStyle } from "./scrollbar";
import { ApiLink } from "./typescript/apiLink";
export class Documentation extends React.PureComponent {
    static childContextTypes = DocumentationContextTypes;
    /** Map of section route to containing page reference. */
    routeToPage;
    contentElement;
    navElement;
    refHandlers = {
        content: (ref) => (this.contentElement = ref),
        nav: (ref) => (this.navElement = ref),
    };
    constructor(props) {
        super(props);
        this.state = {
            activeApiMember: "",
            activePageId: props.defaultPageId,
            activeSectionId: props.defaultPageId,
            isApiBrowserOpen: false,
            isNavigatorOpen: false,
        };
        // build up static map of all references to their page, for navigation / routing
        this.routeToPage = {};
        eachLayoutNode(this.props.docs.nav, (node, parents) => {
            const { reference } = isPageNode(node) ? node : parents[0];
            this.routeToPage[node.route] = reference;
        });
    }
    getChildContext() {
        const { docs, renderViewSourceLinkText } = this.props;
        return {
            getDocsData: () => docs,
            renderBlock: block => renderBlock(block, this.props.tagRenderers),
            renderType: hasTypescriptData(docs)
                ? type => linkify(type, docs.typescript, (name, _d, idx) => React.createElement(ApiLink, { key: `${name}-${idx}`, name: name }))
                : type => type,
            renderViewSourceLinkText: renderViewSourceLinkText ?? (() => "View source"),
            showApiDocs: this.handleApiBrowserOpen,
        };
    }
    render() {
        const { activeApiMember, activePageId, activeSectionId, isApiBrowserOpen } = this.state;
        const { nav, pages } = this.props.docs;
        const rootClasses = classNames("docs-root", { "docs-examples-only": location.search === "?examples" }, this.props.className);
        const apiClasses = classNames("docs-api-drawer", this.props.className);
        return (React.createElement(HotkeysTarget2, { hotkeys: [
                {
                    combo: "shift+s",
                    global: true,
                    group: "Navigation (global)",
                    label: "Open navigator",
                    onKeyDown: this.handleOpenNavigator,
                    preventDefault: true,
                },
                {
                    combo: "[",
                    global: true,
                    group: "Navigation (global)",
                    label: "Previous section",
                    onKeyDown: this.handlePreviousSection,
                },
                {
                    combo: "]",
                    global: true,
                    group: "Navigation (global)",
                    label: "Next section",
                    onKeyDown: this.handleNextSection,
                },
            ] },
            React.createElement("div", { className: rootClasses },
                this.props.banner,
                React.createElement("div", { className: "docs-app" },
                    React.createElement("div", { className: "docs-nav-wrapper" },
                        React.createElement("div", { className: "docs-nav", ref: this.refHandlers.nav },
                            this.props.header,
                            React.createElement("div", { className: "docs-nav-divider" }),
                            React.createElement(NavButton, { icon: "search", hotkey: "shift + s", text: "Search...", onClick: this.handleOpenNavigator }),
                            React.createElement("div", { className: "docs-nav-divider" }),
                            React.createElement(NavMenu, { activePageId: activePageId, activeSectionId: activeSectionId, items: nav, level: 0, onItemClick: this.handleNavigation, renderNavMenuItem: this.props.renderNavMenuItem }),
                            this.props.footer)),
                    React.createElement("main", { className: classNames("docs-content-wrapper", Classes.FILL), ref: this.refHandlers.content, role: "main" },
                        React.createElement(Page, { page: pages[activePageId], renderActions: this.props.renderPageActions, tagRenderers: this.props.tagRenderers }))),
                React.createElement(Drawer, { className: apiClasses, isOpen: isApiBrowserOpen, onClose: this.handleApiBrowserClose },
                    React.createElement(TypescriptExample, { tag: "typescript", value: activeApiMember })),
                React.createElement(Navigator, { isOpen: this.state.isNavigatorOpen, items: nav, itemExclude: this.props.navigatorExclude, onClose: this.handleCloseNavigator }))));
    }
    componentWillMount() {
        addScrollbarStyle();
        this.updateHash();
    }
    componentDidMount() {
        // hooray! so you don't have to!
        FocusStyleManager.onlyShowFocusOnTabs();
        this.scrollToActiveSection();
        this.props.onComponentUpdate?.(this.state.activePageId);
        // whoa handling future history...
        window.addEventListener("hashchange", this.handleHashChange);
        document.addEventListener("scroll", this.handleScroll);
        requestAnimationFrame(() => this.maybeScrollToActivePageMenuItem());
    }
    componentWillUnmount() {
        window.removeEventListener("hashchange", this.handleHashChange);
        document.removeEventListener("scroll", this.handleScroll);
    }
    componentDidUpdate(_prevProps, prevState) {
        const { activePageId } = this.state;
        // only scroll to heading when switching pages, but always check if nav item needs scrolling.
        if (prevState.activePageId !== activePageId) {
            this.scrollToActiveSection();
            this.maybeScrollToActivePageMenuItem();
        }
        this.props.onComponentUpdate?.(activePageId);
    }
    updateHash() {
        // update state based on current hash location
        const sectionId = location.hash.slice(1);
        this.handleNavigation(sectionId === "" ? this.props.defaultPageId : sectionId);
    }
    handleHashChange = () => {
        if (location.hostname.indexOf("blueprint") !== -1) {
            // captures a pageview for new location hashes that are dynamically rendered without a full page request
            window.ga("send", "pageview", {
                page: location.pathname + location.search + location.hash,
            });
        }
        // Don't call componentWillMount since the HotkeysTarget decorator will be invoked on every hashchange.
        this.updateHash();
    };
    handleCloseNavigator = () => this.setState({ isNavigatorOpen: false });
    handleOpenNavigator = () => this.setState({ isNavigatorOpen: true });
    handleNavigation = (activeSectionId) => {
        // only update state if this section reference is valid
        const activePageId = this.routeToPage[activeSectionId];
        if (activeSectionId !== undefined && activePageId !== undefined) {
            this.setState({ activePageId, activeSectionId, isNavigatorOpen: false });
            this.scrollToActiveSection();
        }
    };
    handleNextSection = () => this.shiftSection(1);
    handlePreviousSection = () => this.shiftSection(-1);
    handleScroll = () => {
        const activeSectionId = getScrolledReference(100, this.props.scrollParent);
        if (activeSectionId == null) {
            return;
        }
        // use the longer (deeper) name to avoid jumping up between sections
        this.setState({ activeSectionId });
    };
    maybeScrollToActivePageMenuItem() {
        const { activeSectionId } = this.state;
        // only scroll nav menu if active item is not visible in viewport.
        // using activeSectionId so you can see the page title in nav (may not be visible in document).
        const navItemElement = this.navElement.querySelector(`a[href="#${activeSectionId}"]`);
        const scrollOffset = navItemElement.offsetTop - this.navElement.scrollTop;
        if (scrollOffset < 0 || scrollOffset > this.navElement.offsetHeight) {
            // reveal two items above this item in list
            this.navElement.scrollTop = navItemElement.offsetTop - navItemElement.offsetHeight * 2;
        }
    }
    scrollToActiveSection() {
        if (this.contentElement != null) {
            scrollToReference(this.state.activeSectionId, this.props.scrollParent);
        }
    }
    shiftSection(direction) {
        // use the current hash instead of `this.state.activeSectionId` to avoid cases where the
        // active section cannot actually be selected in the nav (often a short one at the end).
        const currentSectionId = location.hash.slice(1);
        // this map is built by an in-order traversal so the keys are actually sorted correctly!
        const sections = Object.keys(this.routeToPage);
        const index = sections.indexOf(currentSectionId);
        const newIndex = index === -1 ? 0 : (index + direction + sections.length) % sections.length;
        // updating hash triggers event listener which sets new state.
        location.hash = sections[newIndex];
    }
    handleApiBrowserOpen = (activeApiMember) => this.setState({ activeApiMember, isApiBrowserOpen: true });
    handleApiBrowserClose = () => this.setState({ isApiBrowserOpen: false });
}
/** Shorthand for element.querySelector() + cast to HTMLElement */
function queryHTMLElement(parent, selector) {
    return parent.querySelector(selector);
}
/**
 * Returns the reference of the closest section within `offset` pixels of the top of the viewport.
 */
function getScrolledReference(offset, scrollContainer = document.documentElement) {
    const headings = Array.from(scrollContainer.querySelectorAll(".docs-title"));
    while (headings.length > 0) {
        // iterating in reverse order (popping from end / bottom of page)
        // so the first element below the threshold is the one we want.
        const element = headings.pop();
        if (element.offsetTop < scrollContainer.scrollTop + offset) {
            // relying on DOM structure to get reference
            return element.querySelector("[data-route]").getAttribute("data-route");
        }
    }
    return undefined;
}
/**
 * Scroll the scroll container such that the reference heading appears at the top of the viewport.
 */
function scrollToReference(reference, scrollContainer = document.documentElement) {
    // without rAF, on initial load this would scroll to the bottom because the CSS had not been applied.
    // with rAF, CSS is applied before updating scroll positions so all elements are in their correct places.
    requestAnimationFrame(() => {
        const headingAnchor = queryHTMLElement(scrollContainer, `a[data-route="${reference}"]`);
        if (headingAnchor != null && headingAnchor.parentElement != null) {
            const scrollOffset = headingAnchor.parentElement.offsetTop + headingAnchor.offsetTop;
            scrollContainer.scrollTop = scrollOffset;
        }
    });
}
//# sourceMappingURL=documentation.js.map