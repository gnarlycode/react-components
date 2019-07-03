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
    scrollState: Requireable<object>;
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
    animateScroll: (to: number, duration?: number) => Promise<unknown>;
    render(): string | number | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactChild[] | (string & {}) | (string & React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) | (string & React.ReactNodeArray) | (string & React.ReactPortal) | (number & {}) | (number & React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) | (number & React.ReactNodeArray) | (number & React.ReactPortal) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & string) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & number) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & false) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & true) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & React.ReactNodeArray) | (React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> & React.ReactPortal) | (React.ReactChild[] & string) | (React.ReactChild[] & number) | (React.ReactChild[] & false) | (React.ReactChild[] & true) | (React.ReactChild[] & React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) | (React.ReactChild[] & React.ReactNodeArray) | (React.ReactChild[] & React.ReactPortal) | undefined;
}
