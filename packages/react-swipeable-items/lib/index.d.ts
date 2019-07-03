import * as React from 'react';
import { ContentRect } from 'react-measure';
export declare const minmax: (min: number, value: number, max: number) => number;
export interface ChildArgs {
    current: number;
    isClickingPaused: boolean;
    isReady: boolean;
    isSwiping: boolean;
    setCurrent: (current: number) => void;
}
export declare type OnSwipingArgs = {
    position: number;
    progress: number;
};
export declare type ChildType = ((args: ChildArgs) => React.ReactChild[]) | React.ReactChild[];
export declare type StyleType = React.CSSProperties | ((arg: ChildArgs) => React.CSSProperties);
export interface SwipeableItemsProps {
    children?: ChildType;
    className?: string;
    containerClassName?: string;
    containerStyle?: StyleType;
    current?: number;
    defaultCurrent?: number;
    innerRef?: (el: HTMLDivElement) => void;
    itemWidth?: number;
    onChange?: (current: number) => void;
    onSwiped?: () => void;
    onSwiping?: (args: OnSwipingArgs) => void;
    overflowHidden?: boolean;
    render?: ChildType;
    style?: StyleType;
    trackMouse?: boolean;
}
export interface SwipeableItemsState {
    current: number;
    isClickingPaused: boolean;
    isReady: boolean;
    isSwiping: boolean;
    itemWidth: number;
}
export declare class SwipeableItems extends React.PureComponent<SwipeableItemsProps, SwipeableItemsState> {
    private container;
    private isClickingPausedTimeout;
    private isScrolling;
    private swipingDirItems;
    private itemsCount;
    constructor(props: SwipeableItemsProps);
    pauseInteract: () => void;
    unpauseInteract: () => void;
    getIsControlled: () => boolean;
    getCurrent: () => number;
    getItemsCount: () => number;
    getItemWidth: () => number;
    handleSwipingItemsLeft: () => number;
    handleSwipingItemsRight: () => number;
    handleSwiping: (e: any, deltaX: number, deltaY: number, absX: number, absY: number, velocity: number) => void;
    handleSwiped: (e: any, x: number, y: number, isFlick: boolean, velocity: number) => void;
    setCurrent: (current: number, cb?: (() => void) | undefined) => void;
    resetSwipingStyles(): void;
    handleResize: ({ client }: ContentRect) => void;
    itemsRef: (el: HTMLDivElement) => HTMLDivElement;
    getItemsTransform: () => string;
    getViewportStyle: (renderArgs: ChildArgs) => React.CSSProperties;
    getContainerStyle: (renderArgs: ChildArgs) => React.CSSProperties;
    render(): JSX.Element;
}
