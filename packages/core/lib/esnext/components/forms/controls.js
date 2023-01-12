/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
// we need some empty interfaces to show up in docs
// HACKHACK: these components should go in separate files
/* eslint-disable max-classes-per-file, @typescript-eslint/no-empty-interface */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Classes, refHandler, setRef } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
/**
 * Renders common control elements, with additional props to customize appearance.
 * This component is not exported and is only used in this file for `Checkbox`, `Radio`, and `Switch` below.
 */
const Control = ({ alignIndicator, children, className, indicatorChildren, inline, inputRef, label, labelElement, large, style, type, typeClassName, tagName = "label", ...htmlProps }) => {
    const classes = classNames(Classes.CONTROL, typeClassName, {
        [Classes.DISABLED]: htmlProps.disabled,
        [Classes.INLINE]: inline,
        [Classes.LARGE]: large,
    }, Classes.alignmentClass(alignIndicator), className);
    return React.createElement(tagName, { className: classes, style }, React.createElement("input", { ...htmlProps, ref: inputRef, type: type }), React.createElement("span", { className: Classes.CONTROL_INDICATOR }, indicatorChildren), label, labelElement, children);
};
export class Switch extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Switch`;
    render() {
        const { innerLabelChecked, innerLabel, ...controlProps } = this.props;
        const switchLabels = innerLabel || innerLabelChecked
            ? [
                React.createElement("div", { key: "checked", className: Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: Classes.SWITCH_INNER_TEXT }, innerLabelChecked ? innerLabelChecked : innerLabel)),
                React.createElement("div", { key: "unchecked", className: Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: Classes.SWITCH_INNER_TEXT }, innerLabel)),
            ]
            : null;
        return (React.createElement(Control, { ...controlProps, type: "checkbox", typeClassName: Classes.SWITCH, indicatorChildren: switchLabels }));
    }
}
export class Radio extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Radio`;
    render() {
        return React.createElement(Control, { ...this.props, type: "radio", typeClassName: Classes.RADIO });
    }
}
export class Checkbox extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Checkbox`;
    static getDerivedStateFromProps({ indeterminate }) {
        // put props into state if controlled by props
        if (indeterminate != null) {
            return { indeterminate };
        }
        return null;
    }
    state = {
        indeterminate: this.props.indeterminate || this.props.defaultIndeterminate || false,
    };
    // must maintain internal reference for `indeterminate` support
    input = null;
    handleInputRef = refHandler(this, "input", this.props.inputRef);
    render() {
        const { defaultIndeterminate, indeterminate, ...controlProps } = this.props;
        return (React.createElement(Control, { ...controlProps, inputRef: this.handleInputRef, onChange: this.handleChange, type: "checkbox", typeClassName: Classes.CHECKBOX }));
    }
    componentDidMount() {
        this.updateIndeterminate();
    }
    componentDidUpdate(prevProps) {
        this.updateIndeterminate();
        if (prevProps.inputRef !== this.props.inputRef) {
            setRef(prevProps.inputRef, null);
            this.handleInputRef = refHandler(this, "input", this.props.inputRef);
            setRef(this.props.inputRef, this.input);
        }
    }
    updateIndeterminate() {
        if (this.input != null) {
            this.input.indeterminate = this.state.indeterminate;
        }
    }
    handleChange = (evt) => {
        const { indeterminate } = evt.target;
        // update state immediately only if uncontrolled
        if (this.props.indeterminate == null) {
            this.setState({ indeterminate });
        }
        // otherwise wait for props change. always invoke handler.
        this.props.onChange?.(evt);
    };
}
//# sourceMappingURL=controls.js.map