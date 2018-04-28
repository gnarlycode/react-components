###### _GNARLY CODE Production_ Introducing

# React Swipeable Items

This component helps with making swipeable sliders/galleries/menus etc.

## Installation

```sh
npm i --save @gnarlycode/react-swipeable-items
```

## Usage

```jsx
import { SwipeableItems } from '@gnarlycode/react-swipeable-items'

// ...

return (
  <SwipeableItems>
    <Item />
    <Item />
    <Item />
  </SwipeableItems>
)

// Or

return (
  <SwipeableItems>
    {(args) => items.map((item, i) => (
      <Item key={i}>
        {item}
      </Item>
    ))}
  </SwipeableItems>
)
```

Also you can use the `render` prop

```jsx
return (
  <SwipeableItems
    render={(args) => items.map((item, i) => (
      <Item key={i}>
        {item}
      </Item>
    ))}
  />
)
```

If you passing a function as `children` or `render` it will accept next arguments:

```ts
interface ChildArgs {
  current: number
  isClickingPaused: boolean
  isReady: boolean
  isSwiping: boolean
  setCurrent: (current: number) => void
}
```

Availible props:

```ts
type ChildType = ((args: ChildArgs) => React.ReactChild[]) |  React.ReactChild[]
type StyleType = React.CSSProperties | ((arg: ChildArgs) => React.CSSProperties)

type OnSwipingArgs = {
  position: number
  progress: number
}

interface SwipeableItemsProps {
  children?: ChildType
  className?: string
  containerClassName?: string
  containerStyle?: StyleType
  current?: number
  defaultCurrent?: number
  innerRef?: (el: HTMLDivElement) => void
  itemWidth?: number
  onChange?: (current: number) => void
  onSwiped?: () => void
  onSwiping?: (args: OnSwipingArgs) => void
  overflowHidden?: boolean // true by default
  render?: ChildType
  style?: StyleType
  trackMouse?: boolean
}
```

## Used Dependencies

* [React Swipeable](https://github.com/dogfessional/react-swipeable)
* [React Measure](https://github.com/souporserious/react-measure)

###### Author: Dmitry Podlesny
