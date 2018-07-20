import * as React from 'react'
import { match } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
export declare type DataFetcher<F> = <T>(
  fetchContext: F,
  match: match<T>,
) => Promise<void>
declare module 'react-router-config' {
  interface RouteConfig {
    fetchData?: DataFetcher<any>
  }
}
export declare const getDataFetchers: <F>(
  path: string,
  routes: RouteConfig[],
  fetchContext: F,
) => Promise<void[]>
export interface RouteFetchProps<F> {
  fetchContext: F
}
export interface FetchEnhancedProps<F>
  extends RouteFetchProps<F>,
    RouteComponentProps<any> {}
export declare function withRouteFetch<
  F,
  P extends object = {},
  PInner extends P & FetchEnhancedProps<F> = P & FetchEnhancedProps<F>
>(
  routes: RouteConfig[],
): (
  WrappedComponent: React.ReactType<PInner>,
) => React.ComponentClass<
  Pick<
    PInner,
    Exclude<keyof PInner, 'location' | 'history' | 'match' | 'staticContext'>
  >
>
