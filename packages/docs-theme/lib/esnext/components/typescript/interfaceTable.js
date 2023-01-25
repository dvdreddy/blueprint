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
import { isTag, isTsProperty, } from "@documentalist/client";
import classNames from "classnames";
import * as React from "react";
import { Classes, Intent, Tag } from "@blueprintjs/core";
import { DocumentationContextTypes } from "../../common/context";
import { ModifierTable } from "../modifierTable";
import { ApiHeader } from "./apiHeader";
import { DeprecatedTag } from "./deprecatedTag";
// rendered inside RUNNING_TEXT
/* eslint-disable @blueprintjs/html-components */
export class InterfaceTable extends React.PureComponent {
    static contextTypes = DocumentationContextTypes;
    static displayName = "Docs2.InterfaceTable";
    render() {
        const { data, title } = this.props;
        const { renderBlock } = this.context;
        const propRows = [...data.properties, ...data.methods]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(this.renderPropRow);
        return (React.createElement("div", { className: classNames("docs-modifiers", this.props.className) },
            React.createElement(ApiHeader, { ...data }),
            renderBlock(data.documentation),
            React.createElement(ModifierTable, { emptyMessage: "This interface is empty.", title: title },
                propRows,
                this.renderIndexSignature(data.indexSignature))));
    }
    renderPropRow = (entry) => {
        const { renderBlock, renderType } = this.context;
        const { flags: { isDeprecated, isExternal, isOptional }, name, } = entry;
        const { documentation } = isTsProperty(entry) ? entry : entry.signatures[0];
        // ignore props marked with `@internal` tag (this tag is in contents instead of in flags)
        if (documentation != null &&
            documentation.contents != null &&
            documentation.contents.some(val => isTag(val) && val.tag === "internal")) {
            return null;
        }
        const classes = classNames("docs-prop-name", {
            "docs-prop-is-deprecated": isDeprecated === true || typeof isDeprecated === "string",
            "docs-prop-is-internal": !isExternal,
            "docs-prop-is-required": !isOptional,
        });
        const typeInfo = isTsProperty(entry) ? (React.createElement(React.Fragment, null,
            React.createElement("strong", null, renderType(entry.type)),
            React.createElement("em", { className: classNames("docs-prop-default", Classes.TEXT_MUTED) }, entry.defaultValue))) : (React.createElement(React.Fragment, null,
            React.createElement("strong", null, renderType(entry.signatures[0].type))));
        return (React.createElement("tr", { key: name },
            React.createElement("td", { className: classes },
                React.createElement("code", null, name)),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement("code", { className: "docs-prop-type" }, typeInfo),
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(documentation)),
                React.createElement("div", { className: "docs-prop-tags" }, this.renderTags(entry)))));
    };
    renderIndexSignature(entry) {
        if (entry == null) {
            return null;
        }
        const { renderBlock, renderType } = this.context;
        // HACKHACK: Documentalist's indexSignature support isn't _great_, but it's certainly _good enough_
        // entry.type looks like "{ [name: string]: (date: Date) => boolean }"
        const [signature, returnType] = entry.type.slice(2, -2).split("]: ");
        return (React.createElement("tr", { key: entry.name },
            React.createElement("td", { className: "docs-prop-name" },
                React.createElement("code", null,
                    renderType(signature),
                    "]")),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement("code", { className: "docs-prop-type" }, renderType(returnType)),
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(entry.documentation)))));
    }
    renderTags(entry) {
        const { renderType } = this.context;
        const { flags: { isDeprecated, isOptional }, inheritedFrom, } = entry;
        return (React.createElement(React.Fragment, null,
            !isOptional && React.createElement(Tag, { children: "Required", intent: Intent.SUCCESS, minimal: true }),
            React.createElement(DeprecatedTag, { isDeprecated: isDeprecated }),
            inheritedFrom && (React.createElement(Tag, { minimal: true },
                "Inherited from ",
                React.createElement("code", null, renderType(inheritedFrom))))));
    }
}
//# sourceMappingURL=interfaceTable.js.map