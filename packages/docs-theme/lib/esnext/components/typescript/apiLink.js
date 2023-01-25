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
import * as React from "react";
import { DocumentationContextTypes } from "../../common/context";
/**
 * Renders a link to open a symbol in the API Browser.
 */
export class ApiLink extends React.PureComponent {
    static contextTypes = DocumentationContextTypes;
    render() {
        const { className, name } = this.props;
        return (React.createElement("a", { className: className, href: `#api/${name}`, onClick: this.handleClick }, name));
    }
    handleClick = (evt) => {
        evt.preventDefault();
        this.context.showApiDocs(this.props.name);
    };
}
//# sourceMappingURL=apiLink.js.map