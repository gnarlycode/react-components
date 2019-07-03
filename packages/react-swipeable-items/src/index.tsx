import * as React from 'react'
import * as Swipeable from 'react-swipeable'
import Measure, { ContentRect } from 'react-measure'

const easeOutCubic = 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
export const minmax = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(max, value))

export interface ChildArgs {
  current: number
  isClickingPaused: boolean
  isReady: boolean
  isSwiping: boolean
  setCurrent: (current: number) => void
}

export type OnSwipingArgs = {
  position: number
  progress: number
}

const SCROLL_BREAK_HEIGHT = 50

export type ChildType =
  | ((args: ChildArgs) => React.ReactChild[])
  | React.ReactChild[]

export type StyleType =
  | React.CSSProperties
  | ((arg: ChildArgs) => React.CSSProperties)

export interface SwipeableItemsProps {
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
  overflowHidden?: boolean
  render?: ChildType
  style?: StyleType
  trackMouse?: boolean
}

export interface SwipeableItemsState {
  current: number
  isClickingPaused: boolean
  isReady: boolean
  isSwiping: boolean
  itemWidth: number
}

// Component
export class SwipeableItems extends React.PureComponent<
  SwipeableItemsProps,
  SwipeableItemsState
> {
  private container: HTMLDivElement | undefined
  private isClickingPausedTimeout: number | undefined
  private isScrolling: boolean = false
  private swipingDirItems: number = 0
  private itemsCount: number = 0

  constructor(props: SwipeableItemsProps) {
    super(props)
    this.state = {
      current: props.defaultCurrent || 0,
      isClickingPaused: false,
      isReady: props.itemWidth !== undefined,
      isSwiping: false,
      itemWidth: -1,
    }
  }

  pauseInteract = () => {
    if (this.isClickingPausedTimeout) {
      clearTimeout(this.isClickingPausedTimeout)
      this.isClickingPausedTimeout = undefined
    }
    this.setState({ isClickingPaused: true })
  }

  unpauseInteract = () => {
    if (!this.isClickingPausedTimeout) {
      this.isClickingPausedTimeout = window.setTimeout(
        () => this.setState({ isClickingPaused: false }),
        100,
      )
    }
  }

  getIsControlled = () => this.props.current !== undefined
  getCurrent = (): number =>
    this.getIsControlled() ? (this.props.current as number) : this.state.current

  getItemsCount = () => this.itemsCount

  getItemWidth = () =>
    this.props.itemWidth !== undefined
      ? this.props.itemWidth
      : this.state.itemWidth

  handleSwipingItemsLeft = () => (this.swipingDirItems = 1)
  handleSwipingItemsRight = () => (this.swipingDirItems = -1)

  // Swipe Items
  handleSwiping = (
    e: any,
    deltaX: number,
    deltaY: number,
    absX: number,
    absY: number,
    velocity: number,
  ) => {
    const { onSwiped, onSwiping } = this.props
    const { isSwiping } = this.state

    const current = this.getCurrent()
    const itemWidth = this.getItemWidth()
    const itemsCount = this.getItemsCount()

    this.isScrolling = Boolean(
      this.isScrolling ||
        (Math.abs(deltaX) > 10 &&
          Math.abs(deltaY) > SCROLL_BREAK_HEIGHT &&
          Math.abs(deltaX) < Math.abs(deltaY)),
    )

    if (this.isScrolling) {
      this.setState({ isSwiping: false }, () => {
        if (onSwiped) onSwiped()
        this.resetSwipingStyles()
      })
    }

    if (!this.container || this.isScrolling) return

    this.pauseInteract()

    if (!isSwiping) this.setState({ isSwiping: true })

    const position = minmax(
      0,
      current * itemWidth + deltaX,
      (itemsCount - 1) * itemWidth,
    )

    const transform = `translate3d(${-position}px, 0, 0)`
    this.container.style.transform = transform

    if (onSwiping) {
      onSwiping({
        position,
        progress: (position + itemWidth) / itemWidth,
      })
    }
  }

  handleSwiped = (
    e: any,
    x: number,
    y: number,
    isFlick: boolean,
    velocity: number,
  ) => {
    if (this.isScrolling) {
      this.isScrolling = false
      return
    }
    if (!this.container) return

    const { onSwiped } = this.props

    const current = this.getCurrent()
    const itemWidth = this.getItemWidth()
    const itemsCount = this.getItemsCount()

    // Position Numbers
    const progress = (current * itemWidth + x) / itemWidth
    const leftItem = Math.floor(progress)
    const rightItem = Math.ceil(progress)

    // Number of slide which is sliding to
    const swipingTo = this.swipingDirItems === -1 ? leftItem : rightItem

    // Ratio of sliding distance
    const shiftRatio =
      this.swipingDirItems === -1
        ? 1 - (progress - leftItem)
        : 1 - (rightItem - progress)

    // Compute new slide
    const slide =
      isFlick || shiftRatio > 0.1
        ? // Slide from sliding direction
          swipingTo
        : // Overslide left
        this.swipingDirItems === -1 && current !== rightItem
        ? rightItem
        : // Overslide right
        this.swipingDirItems === 1 && current !== leftItem
        ? leftItem
        : // Same slide
          current

    // Check bounds
    const newCurrent = minmax(0, slide, itemsCount - 1)

    this.container.style.transition = `transform ${easeOutCubic} 350ms`
    this.unpauseInteract()
    this.setState({ isSwiping: false }, () => {
      if (newCurrent !== current) {
        this.setCurrent(newCurrent, () => {
          if (onSwiped) onSwiped()
        })
      } else {
        this.resetSwipingStyles()
        if (onSwiped) onSwiped()
      }
    })
  }

  setCurrent = (current: number, cb?: () => void) => {
    const { onChange } = this.props
    if (onChange) onChange(current)
    this.setState({ current }, cb)
  }

  resetSwipingStyles() {
    if (!this.container) return
    const transform = this.getItemsTransform()
    this.container.style.transform = transform
  }

  handleResize = ({ client }: ContentRect) => {
    if (client) {
      this.setState({ itemWidth: client.width }, () => {
        if (!this.state.isReady) {
          setTimeout(() => this.setState({ isReady: true }), 0)
        }
      })
    }
  }

  itemsRef = (el: HTMLDivElement) => (this.container = el)

  getItemsTransform = () => {
    const current = this.getCurrent()
    const itemWidth = this.getItemWidth()
    return `translate3d(${-current * itemWidth}px, 0, 0)`
  }

  getViewportStyle = (renderArgs: ChildArgs): React.CSSProperties => {
    const { style, overflowHidden = true } = this.props
    const s: React.CSSProperties = {
      ...(typeof style === 'function' ? style(renderArgs) : style || {}),
    }
    if (overflowHidden) {
      s.overflow = 'hidden'
    }
    return s
  }

  getContainerStyle = (renderArgs: ChildArgs): React.CSSProperties => {
    const { containerStyle } = this.props
    return {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      transform: this.getItemsTransform(),
      transition:
        this.state.isReady && !this.state.isSwiping
          ? `transform ${easeOutCubic} 350ms`
          : '',
      userSelect: 'none',
      width: 'fit-content',
      willChange: 'transform',
      ...(typeof containerStyle === 'function'
        ? containerStyle(renderArgs)
        : containerStyle || {}),
    }
  }

  render() {
    const {
      children,
      className,
      containerClassName,
      innerRef,
      render,
      trackMouse,
    } = this.props
    const { isClickingPaused, isSwiping, isReady } = this.state

    const renderArgs = {
      current: this.getCurrent(),
      isClickingPaused,
      isReady,
      isSwiping,
      setCurrent: this.setCurrent,
    }

    const renderChild = (ch?: ChildType) =>
      ch && typeof ch === 'function'
        ? ch(renderArgs)
        : ch && typeof ch !== 'function'
        ? ch
        : undefined

    const renderChildren = renderChild(children) || renderChild(render) || null

    this.itemsCount = React.Children.count(renderChildren)

    return (
      <Measure
        client={this.props.itemWidth === undefined}
        onResize={this.handleResize}
      >
        {({ measureRef }) => (
          <Swipeable
            className={className}
            innerRef={(el: HTMLDivElement) => {
              measureRef(el)
              if (innerRef) innerRef(el)
            }}
            onSwiped={this.handleSwiped}
            onSwiping={this.handleSwiping}
            onSwipingLeft={this.handleSwipingItemsLeft}
            onSwipingRight={this.handleSwipingItemsRight}
            style={this.getViewportStyle(renderArgs)}
            trackMouse={trackMouse}
          >
            <div
              className={containerClassName}
              ref={this.itemsRef}
              style={this.getContainerStyle(renderArgs)}
            >
              {renderChildren}
            </div>
          </Swipeable>
        )}
      </Measure>
    )
  }
}
