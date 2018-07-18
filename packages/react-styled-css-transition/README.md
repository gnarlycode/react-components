###### _GNARLY CODE Production_ Introducing

# React Styled Css Transition

Helper function for using [CSSTransition](https://reactcommunity.org/react-transition-group/css-transition) with [Styled Components](https://www.styled-components.com/)

## Installation

```sh
npm i --save @gnarlycode/react-styled-css-transition
```

## Usage

```jsx
import { css } from 'styled-components'
import { styledCSSTransition } from '@gnarlycode/react-styled-css-transition'

const TransitionComponent = styledCSSTransition(
  {
    mountOnEnter: true,
    timeout: {
      enter: 100,
      exit: 100,
    },
    unmountOnExit: true,
    // any CSSTransitionProps
  },
  css`
    &.appear {}
    &.appear-active {}
    &.enter {}
    &.enter-active {}
    &.exit {}
    &.exit-active {}
  `,
)

```

###### Author: Dmitry Podlesny
