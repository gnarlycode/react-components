import * as React from 'react'
import { compose } from 'recompose'
import { RouteComponentProps, withRouter } from 'react-router'
import { ProvidedSсrollState } from './ScrollStateProvider'
import { withScrollState } from './withScrollState'

// Typings
export interface ScrollLockProps {}
interface EnhancedProps
  extends ScrollLockProps,
    ProvidedSсrollState,
    RouteComponentProps<{}> {}

const ready = (callback: () => void) => {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

// Constants
const storagePrefix = 'saved-scroll-'

// Component
export const ScrollRestorer = compose<EnhancedProps, ScrollLockProps>(
  withRouter,
  withScrollState,
)(
  class extends React.Component<EnhancedProps, {}> {
    componentDidMount() {
      ready(() => this.checkHash())
    }

    // Manages scroll position between history steps
    componentWillUpdate(nextProps: EnhancedProps) {
      const current = this.props.location.key
      const next = nextProps.location.key
      if (current !== next) {
        sessionStorage.setItem(
          storagePrefix + current,
          String(this.props.scrollState.getScrollPosition()),
        )
      }
    }

    // Manages scroll position between history steps
    componentDidUpdate(prevProps: EnhancedProps) {
      const current = this.props.location.key
      const prev = prevProps.location.key
      if (current !== prev) {
        const top = Number(sessionStorage.getItem(storagePrefix + current) || 0)
        this.props.scrollState.setScrollPosition(top)
      }
      this.checkHash()
    }

    checkHash() {
      if (this.props.location.hash) {
        const el = document.getElementById(this.props.location.hash.substr(1))
        if (el) {
          const elParent = el.offsetParent as HTMLElement
          this.props.scrollState.setScrollPosition(
            el.offsetTop +
              Number(
                elParent && typeof elParent.offsetTop === 'number'
                  ? elParent.offsetTop
                  : 0,
              ),
          )
        }
      }
    }

    render(): null {
      return null
    }
  },
)
