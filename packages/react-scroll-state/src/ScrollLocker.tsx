import * as React from 'react'
import { ProvidedSсrollState } from './ScrollStateProvider'
import { withScrollState } from './withScrollState'
import isBrowser from 'is-in-browser'

// ScrollLock Component
export const ScrollLocker = withScrollState(
  class extends React.Component<ProvidedSсrollState, {}> {
    constructor(props: ProvidedSсrollState) {
      super(props)
      // For ssr
      if (!isBrowser) this.props.scrollState.lockScroll()
    }

    componentDidMount() {
      this.props.scrollState.lockScroll()
    }

    componentWillUnmount() {
      this.props.scrollState.unlockScroll()
    }

    render(): null {
      return null
    }
  },
)
