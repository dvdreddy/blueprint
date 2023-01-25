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
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Classes, DISPLAYNAME_PREFIX, Intent, } from "../../common";
import { H4 } from "../html/html";
import { Icon, IconSize } from "../icon/icon";
export class Callout extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Callout`;
    render() {
        const { className, children, icon, intent, title, ...htmlProps } = this.props;
        const iconName = this.getIconName(icon, intent);
        const classes = classNames(Classes.CALLOUT, Classes.intentClass(intent), { [Classes.CALLOUT_ICON]: iconName != null }, className);
        return (React.createElement("div", { className: classes, ...htmlProps },
            iconName && React.createElement(Icon, { icon: iconName, size: IconSize.LARGE, "aria-hidden": true, tabIndex: -1 }),
            title && React.createElement(H4, null, title),
            children));
    }
    getIconName(icon, intent) {
        // 1. no icon
        if (icon === null) {
            return undefined;
        }
        // 2. defined iconName prop
        if (icon !== undefined) {
            return icon;
        }
        // 3. default intent icon
        switch (intent) {
            case Intent.DANGER:
                return "error";
            case Intent.PRIMARY:
                return "info-sign";
            case Intent.WARNING:
                return "warning-sign";
            case Intent.SUCCESS:
                return "tick";
            default:
                return undefined;
        }
    }
}
//# sourceMappingURL=callout.js.map