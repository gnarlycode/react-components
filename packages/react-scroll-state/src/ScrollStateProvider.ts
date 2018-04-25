import * as React from 'react'
import isBrowser from 'is-in-browser'
import { object as objectType, Requireable } from 'prop-types'
import { Delegate } from './Delegate'

// Scroll lock classes
export const defaultBodyLockClass = 'body-scroll-lock'
export const defaultHtmlLockClass = 'html-scroll-lock'

// Typings
export interface ScrollStateProps {
  bodyLockClass?: string
  children?: React.ReactChild | React.ReactChild[]
  htmlLockClass?: string
}

export interface ScrollStateContext {
  animateScroll: (to: number, duration?: number) => void
  getScrollPosition: () => number
  isScrollLocked: () => boolean
  lockScroll: () => void
  scrollEvent: Delegate
  setScrollPosition: (scroll: number) => void
  unlockScroll: () => void
}

export interface ProvidedSсrollState {
  scrollState: ScrollStateContext
}

export const contextTypes = {
  scrollState: objectType,
}

// Component
export class ScrollStateProvider extends React.PureComponent<
  ScrollStateProps,
  {}
> {
  public static childContextTypes: {
    scrollState: Requireable<any>
  } = contextTypes

  public static defaultProps: Partial<ScrollStateProps> = {
    bodyLockClass: defaultBodyLockClass,
    htmlLockClass: defaultHtmlLockClass,
  }

  private animateRafId?: number
  private body?: HTMLElement
  private html?: HTMLElement
  private isScrollLocked: boolean = false
  private lockersStack: number = 0
  private scrollEvent: Delegate = new Delegate()
  private scrollPosition: number = 0

  constructor(props: ScrollStateProps) {
    super(props)
    if (isBrowser) {
      this.body = document.body
      this.html = document.documentElement
    }
  }

  getChildContext(): ProvidedSсrollState {
    return {
      scrollState: {
        animateScroll: this.animateScroll,
        getScrollPosition: this.getScrollPosition,
        isScrollLocked: this.getIsScrollLocked,
        lockScroll: this.lockScroll,
        scrollEvent: this.scrollEvent,
        setScrollPosition: this.setScrollPosition,
        unlockScroll: this.unlockScroll,
      },
    }
  }

  getIsScrollLocked = () => this.isScrollLocked

  fireScrollEvent = () => this.scrollEvent.fire()

  setScrollLockState(value: boolean) {
    this.isScrollLocked = value
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fireScrollEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fireScrollEvent, false)
  }

  // Returns current scroll position
  // Or value before  lock if the scroll is locked now
  getScrollPosition = () => {
    if (!this.isScrollLocked) {
      this.scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    }
    return this.scrollPosition
  }

  // Scrolls page to given position
  // Or sets `scrollPosition` if scroll is locked to properly restore new value
  setScrollPosition = (scroll: number) => {
    if (this.isScrollLocked) {
      this.scrollPosition = scroll
      if (this.body) this.body.style.top = `-${scroll}px`
      this.scrollEvent.fire()
    } else {
      window.scrollTo(0, scroll)
    }
  }

  // Scroll Locker
  lockScroll = () => {
    if (++this.lockersStack > 1) return
    if (isBrowser) {
      const {
        bodyLockClass = defaultBodyLockClass,
        htmlLockClass = defaultHtmlLockClass,
      } = this.props
      const scroll = this.getScrollPosition()
      this.setScrollLockState(true)
      if (this.body) this.body.classList.add(bodyLockClass)
      if (this.html) this.html.classList.add(htmlLockClass)
      if (this.body) this.body.style.top = `-${scroll}px`
    } else {
      this.setScrollLockState(true)
    }
  }

  // Scroll Unlocker
  unlockScroll = () => {
    if (--this.lockersStack > 0) return
    if (isBrowser) {
      const {
        bodyLockClass = defaultBodyLockClass,
        htmlLockClass = defaultHtmlLockClass,
      } = this.props
      if (this.body) this.body.classList.remove(bodyLockClass)
      if (this.html) this.html.classList.remove(htmlLockClass)
      if (this.body) this.body.style.top = ''
      const scroll = this.getScrollPosition()
      window.scrollTo(0, scroll)
      this.scrollEvent.fire()
      this.setScrollLockState(false)
    } else {
      this.setScrollLockState(false)
    }
  }

  // Animate Scroll
  animateScroll = (to: number, duration: number = 350) => {
    return new Promise(resolve => {
      if (this.animateRafId) {
        window.cancelAnimationFrame(this.animateRafId)
        this.animateRafId = undefined
      }

      const start = this.getScrollPosition()
      const distance = to - start
      let startTime: number

      if (distance === 0 || this.isScrollLocked) {
        if (this.isScrollLocked) this.setScrollPosition(start + distance)
        resolve()
        return
      }

      const animateScroll = (time: number) => {
        if (!startTime) startTime = time
        const currentTime = time - startTime
        const prog = currentTime / duration
        this.setScrollPosition(start + prog * distance)
        if (currentTime < duration) {
          this.animateRafId = window.requestAnimationFrame(animateScroll)
        } else {
          this.animateRafId = undefined
          resolve()
        }
      }

      this.animateRafId = window.requestAnimationFrame(animateScroll)
    })
  }

  render() {
    return this.props.children
  }
}
