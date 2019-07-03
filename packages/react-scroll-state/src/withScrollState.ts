import * as React from 'react'
import { contextTypes, ProvidedSсrollState } from './ScrollStateProvider'

// Scroll State HOC
export function withScrollState<
  TInner extends ProvidedSсrollState = ProvidedSсrollState,
  TOutter extends object = {}
>(
  WrappedComponent: React.ElementType<TInner>,
): React.FunctionComponent<TOutter> {
  const ScrollStateHOC: React.FunctionComponent<TOutter> = (props, context) =>
    React.createElement(WrappedComponent, { ...(props as object), ...context })
  ScrollStateHOC.contextTypes = contextTypes
  return ScrollStateHOC
}
