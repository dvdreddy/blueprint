import * as React from "react";
/**
 * Dispatch a native KeyBoardEvent on the target element with the given type
 * and event arguments. `type` can be one of "keydown|keyup|keypress".
 *
 * This method is for unit testing with PhantomJS and Chrome ONLY! The hacks we
 * use aren't compatible with other browsers. Do not use this method for
 * anything other than simulating keyboard events for PhantomJS and karma
 * chrome tests.
 */
export declare function dispatchTestKeyboardEvent(target: EventTarget, eventType: string, key: string, shift?: boolean): void;
/**
 * Same as dispatchTestKeyboardEvent, but with more control over the keyCode.
 */
export declare function dispatchTestKeyboardEventWithCode(target: EventTarget, eventType: string, key: string, keyCode: number, shift?: boolean): void;
export declare function createMouseEvent(eventType?: string, clientX?: number, clientY?: number): MouseEvent;
export declare function dispatchMouseEvent(target: EventTarget, eventType?: string, clientX?: number, clientY?: number): void;
export declare function createTouchEvent(eventType?: string, clientX?: number, clientY?: number): MouseEvent;
export declare function dispatchTouchEvent(target: EventTarget, eventType?: string, clientX?: number, clientY?: number): void;
/**
 * Helper utility to test validateProps behavior.
 * We can't simply call mount() here since React 16 throws before we can even validate the errors thrown
 * in component constructors.
 */
export declare function expectPropValidationError<P extends object>(Component: React.ComponentClass<P>, props: P & {
    children?: React.ReactNode;
}, errorMessage?: string, assertionMessage?: string): void;
