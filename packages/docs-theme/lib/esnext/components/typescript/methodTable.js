/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
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
import { isTag } from "@documentalist/client";
import classNames from "classnames";
import * as React from "react";
import { Code, Intent, Tag } from "@blueprintjs/core";
import { DocumentationContextTypes } from "../../common/context";
import { ModifierTable } from "../modifierTable";
import { ApiHeader } from "./apiHeader";
import { DeprecatedTag } from "./deprecatedTag";
export class MethodTable extends React.PureComponent {
    static contextTypes = DocumentationContextTypes;
    static displayName = "Docs2.MethodTable";
    render() {
        const { data } = this.props;
        const propRows = [...data.signatures]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((entry) => entry.parameters.map(parameter => this.renderPropRow(parameter)));
        return (React.createElement("div", { className: classNames("docs-modifiers", this.props.className) },
            React.createElement(ApiHeader, { ...data }),
            React.createElement(ModifierTable, { emptyMessage: "No return", title: "Returns", descriptionTitle: "" }, this.renderReturnSignature(data.signatures[0])),
            React.createElement(ModifierTable, { emptyMessage: "This parameter is empty.", title: "Parameters" }, propRows)));
    }
    renderPropRow = (parameter) => {
        const { renderBlock, renderType } = this.context;
        const { flags: { isDeprecated, isExternal, isOptional }, name, } = parameter;
        const { documentation } = parameter;
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
        const typeInfo = (React.createElement(React.Fragment, null,
            React.createElement("strong", null, renderType(parameter.type))));
        return (React.createElement("tr", { key: name },
            React.createElement("td", { className: classes },
                React.createElement(Code, null, name)),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement(Code, { className: "docs-prop-type" }, typeInfo),
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(documentation)),
                React.createElement("div", { className: "docs-prop-tags" }, this.renderTags(parameter)))));
    };
    renderTags(entry) {
        const { flags: { isDeprecated, isOptional }, } = entry;
        return (React.createElement(React.Fragment, null,
            !isOptional && React.createElement(Tag, { children: "Required", intent: Intent.SUCCESS, minimal: true }),
            React.createElement(DeprecatedTag, { isDeprecated: isDeprecated })));
    }
    renderReturnSignature(entry) {
        if (entry == null) {
            return null;
        }
        const { renderBlock, renderType } = this.context;
        return (React.createElement("tr", { key: entry.name },
            React.createElement("td", { className: "docs-prop-name" },
                React.createElement(Code, { className: "docs-prop-type" }, renderType(entry.returnType))),
            React.createElement("td", { className: "docs-prop-details" },
                React.createElement("div", { className: "docs-prop-description" }, renderBlock(entry.documentation)))));
    }
}
//# sourceMappingURL=methodTable.js.map