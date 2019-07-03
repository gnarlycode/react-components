import * as React from 'react';
import { match } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
export declare type DataFetcher<F> = <T>(fetchContext: F, match: match<T>) => Promise<void>;
declare module 'react-router-config' {
    interface RouteConfig {
        fetchData?: DataFetcher<any>;
    }
}
export declare const getDataFetchers: <F>(path: string, routes: RouteConfig[], fetchContext: F) => Promise<void[]>;
export interface RouteFetchProps<F> {
    fetchContext: F;
}
export interface FetchEnhancedProps<F> extends RouteFetchProps<F>, RouteComponentProps<any> {
}
export declare function withRouteFetch<F, P extends object = {}, PInner extends P & FetchEnhancedProps<F> = P & FetchEnhancedProps<F>>(routes: RouteConfig[]): (WrappedComponent: React.ElementType<PInner>) => React.ComponentClass<import("react-router").Omit<PInner, "match" | "location" | "history" | "staticContext"> & import("react-router").WithRouterProps<{
    new (props: Readonly<PInner>): {
        componentDidMount(): void;
        componentDidUpdate(prevProps: PInner): void;
        actualizeData: () => void;
        render(): React.ReactElement<PInner, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PInner>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<PInner> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: PInner, context?: any): {
        componentDidMount(): void;
        componentDidUpdate(prevProps: PInner): void;
        actualizeData: () => void;
        render(): React.ReactElement<PInner, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PInner>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<PInner> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
}>, any> & import("react-router").WithRouterStatics<{
    new (props: Readonly<PInner>): {
        componentDidMount(): void;
        componentDidUpdate(prevProps: PInner): void;
        actualizeData: () => void;
        render(): React.ReactElement<PInner, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PInner>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<PInner> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: PInner, context?: any): {
        componentDidMount(): void;
        componentDidUpdate(prevProps: PInner): void;
        actualizeData: () => void;
        render(): React.ReactElement<PInner, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PInner>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<PInner> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
}>;
