/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
import { Delegate } from './Delegate';
export declare const defaultBodyLockClass = "body-scroll-lock";
export declare const defaultHtmlLockClass = "html-scroll-lock";
export interface ScrollStateProps {
    bodyLockClass?: string;
    children?: React.ReactChild | React.ReactChild[];
    htmlLockClass?: string;
}
export interface ScrollStateContext {
    animateScroll: (to: number, duration?: number) => void;
    getScrollPosition: () => number;
    isScrollLocked: () => boolean;
    lockScroll: () => void;
    scrollEvent: Delegate;
    setScrollPosition: (scroll: number) => void;
    unlockScroll: () => void;
}
export interface ProvidedSсrollState {
    scrollState: ScrollStateContext;
}
export declare const contextTypes: {
    scrollState: Requireable<any>;
};
export declare class ScrollStateProvider extends React.PureComponent<ScrollStateProps, {}> {
    static childContextTypes: {
        scrollState: Requireable<any>;
    };
    static defaultProps: Partial<ScrollStateProps>;
    private animateRafId?;
    private body?;
    private html?;
    private isScrollLocked;
    private lockersStack;
    private scrollEvent;
    private scrollPosition;
    constructor(props: ScrollStateProps);
    getChildContext(): ProvidedSсrollState;
    getIsScrollLocked: () => boolean;
    fireScrollEvent: () => void;
    setScrollLockState(value: boolean): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getScrollPosition: () => number;
    setScrollPosition: (scroll: number) => void;
    lockScroll: () => void;
    unlockScroll: () => void;
    animateScroll: (to: number, duration?: number) => Promise<{}>;
    render(): string | number | React.ReactElement<any> | React.ReactChild[] | (undefined & string) | (undefined & number) | (null & string) | (null & number) | (string & undefined) | (string & number) | (string & React.ReactElement<any>) | (string & React.ReactChild[]) | (number & undefined) | (number & string) | (number & React.ReactElement<any>) | (number & React.ReactChild[]) | (true & string) | (true & number) | (true & React.ReactElement<any>) | (true & React.ReactChild[]) | (false & string) | (false & number) | (false & React.ReactElement<any>) | (false & React.ReactChild[]) | (string & {}) | (number & {}) | (React.ReactElement<any> & string) | (React.ReactElement<any> & number) | (React.ReactElement<any> & React.ReactChild[]) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & string) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & number) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & React.ReactElement<any>) | ((string | number | boolean | any[] | React.ReactElement<any>)[] & React.ReactChild[]) | (React.ReactPortal & string) | (React.ReactPortal & number) | (React.ReactPortal & React.ReactElement<any>) | (React.ReactPortal & React.ReactChild[]) | undefined;
}
