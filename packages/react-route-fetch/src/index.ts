import * as React from 'react'
import { match } from 'react-router'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { matchRoutes, RouteConfig } from 'react-router-config'

export type DataFetcher<F> = <T>(
  fetchContext: F,
  match: match<T>,
) => Promise<void>

declare module 'react-router-config' {
  export interface RouteConfig {
    fetchData?: DataFetcher<any>
  }
}

export const getDataFetchers = <F>(
  path: string,
  routes: RouteConfig[],
  fetchContext: F,
) =>
  Promise.all(
    matchRoutes(routes, path)
      .map(p => p.route.fetchData && p.route.fetchData(fetchContext, p.match))
      .filter(x => Boolean(x)),
  )

export interface RouteFetchProps<F> {
  fetchContext: F
}

export interface FetchEnhancedProps<F>
  extends RouteFetchProps<F>,
    RouteComponentProps<any> {}

export function withRouteFetch<
  F,
  P extends object = {},
  PInner extends P & FetchEnhancedProps<F> = P & FetchEnhancedProps<F>
>(routes: RouteConfig[]) {
  return (WrappedComponent: React.ReactType<PInner>) =>
    withRouter(
      class extends React.PureComponent<PInner> {
        componentDidMount() {
          this.actualizeData()
        }

        componentDidUpdate(prevProps: PInner) {
          const l = this.props.location
          const pl = prevProps.location
          if (pl && l && pl.pathname !== l.pathname) this.actualizeData()
        }

        actualizeData = () => {
          const { fetchContext, location } = this.props
          if (location) {
            Promise.resolve(
              getDataFetchers(location.pathname, routes, fetchContext),
            )
          }
        }

        render() {
          return React.createElement(WrappedComponent, this.props)
        }
      },
    )
}
