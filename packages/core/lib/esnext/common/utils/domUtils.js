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
export function elementIsOrContains(element, testElement) {
    return element === testElement || element.contains(testElement);
}
/**
 * Gets the active element in the document or shadow root (if an element is provided, and it's in the shadow DOM).
 */
export function getActiveElement(element, options) {
    if (element == null) {
        return document.activeElement;
    }
    const rootNode = (element.getRootNode(options) ?? document);
    return rootNode.activeElement;
}
/**
 * Throttle an event on an EventTarget by wrapping it in a
 * `requestAnimationFrame` call. Returns the event handler that was bound to
 * given eventName so you can clean up after yourself.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
/* istanbul ignore next */
export function throttleEvent(target, eventName, newEventName) {
    const throttledFunc = throttleImpl((event) => {
        target.dispatchEvent(new CustomEvent(newEventName, event));
    });
    target.addEventListener(eventName, throttledFunc);
    return throttledFunc;
}
/**
 * Throttle a callback by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 *
 * @see https://www.html5rocks.com/en/tutorials/speed/animations/
 */
export function throttleReactEventCallback(callback, options = {}) {
    const throttledFunc = throttleImpl(callback, (event2) => {
        if (options.preventDefault) {
            event2.preventDefault();
        }
    }, 
    // prevent React from reclaiming the event object before we reference it
    (event2) => event2.persist());
    return throttledFunc;
}
/**
 * Throttle a method by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(method) {
    return throttleImpl(method);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function throttleImpl(onAnimationFrameRequested, onBeforeIsRunningCheck, onAfterIsRunningCheck) {
    let isRunning = false;
    const func = (...args) => {
        onBeforeIsRunningCheck?.(...args);
        if (isRunning) {
            return;
        }
        isRunning = true;
        onAfterIsRunningCheck?.(...args);
        requestAnimationFrame(() => {
            onAnimationFrameRequested(...args);
            isRunning = false;
        });
    };
    return func;
}
//# sourceMappingURL=domUtils.js.map