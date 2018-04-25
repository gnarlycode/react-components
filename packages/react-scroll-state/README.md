###### _GNARLY CODE Production_ Introducing

# React Scroll State

Bunch of components that will help you to lock, track, change and restore scroll position on routing properly.

## Installation

```sh
npm i --save @gnarlycode/react-scroll-state
```

## Usage

First of all you should add next global styles to your app:

```css
html.html-scroll-lock {
  overflow-y: scroll;
}

body.body-scroll-lock {
  overflow: hidden;
  position: fixed;
}
```

You can get this names as strings importing it:

```jsx
import { injectGlobal } from 'styled-components'
import {
  defaultBodyLockClass,
  defaultHtmlLockClass,
} from '@gnarlycode/react-scroll-state'

injectGlobal`
  html.${defaultHtmlLockClass} {
    overflow-y: scroll;
  }

  body.${defaultBodyLockClass} {
    overflow: hidden;
    position: fixed;
  }
`
```

You can use your own classnames. In this case you should pass it to [ScrollStateProvider](#scrollstateprovider)

### ScrollStateProvider

Manages all scroll operations. You can just wrap all your app with this provider:

```jsx
import { App } from 'your-app'
import { ScrollStateProvider } from '@gnarlycode/react-scroll-state'

return (
  <ScrollStateProvider>
    <App />
  </ScrollStateProvider>
)
```

You can pass custom lock classes as `bodyLockClass` and `htmlLockClass` props.

### ScrollLocker

Locks browser scroll when mounted:

```jsx
import { ScrollLocker } from '@gnarlycode/react-scroll-state'

return (
  <>
    ...
    {isScrollLocked && <ScrollLocker />}
    ...
  </>
)
```

### ScrollRestorer

This component restores scroll position when history changes. Designed to work with [React Router 4](https://reacttraining.com/react-router/).

It uses [withRouter](https://reacttraining.com/react-router/web/api/withRouter) and [withScrollState](#withscrollstate) under the hood so should be mounted anywhere inside `Router` and [ScrollStateProvider](#scrollstateprovider):

```jsx
import { App } from 'your-app'
import {
  ScrollRestorer,
  ScrollStateProvider,
} from '@gnarlycode/react-scroll-state'

return (
  <ScrollStateProvider>
    <ScrollRestorer />
    <App />
  </ScrollStateProvider>
)
```

### withScrollState

The high-order component provides you `scrollState` from [ScrollStateProvider](#scrollstateprovider) as prop:

```jsx
import { withScrollState } from '@gnarlycode/react-scroll-state'

const myComponent = withScrollState(({ scrollState }) => <div />)
```

The `scrollState` object will contain next fields:

```ts
export interface ScrollStateContext {
  animateScroll(to: number, duration?: number): void
  getScrollPosition(): number
  isScrollLocked(): boolean
  lockScroll(): void
  scrollEvent: {
    fire(): void
    subscribe(fn: () => void)): void
    unsubscribe(fn: () => void)): void
  }
  setScrollPosition(scroll: number): void
  unlockScroll(): void
}
```

###### Author: Dmitry Podlesny
