import * as React from 'react'
import styled, { Interpolation, StyledComponentClass } from 'styled-components'
import CSSTransition, {
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition'
import { TransitionProps } from 'react-transition-group/Transition'

const transitionPropsNames = [
  'in',
  'mountOnEnter',
  'onAppear',
  'onEnter',
  'onEntered',
  'onEntering',
  'onExit',
  'onExit',
  'onExited',
  'onExited',
  'onExiting',
  'onExiting',
  'timeout',
  'unmountOnExit',
]

const groupProps = (props: object) => {
  const groups: any[] = [{}, {}]
  Object.entries(props).forEach(([key, value]) => {
    if (transitionPropsNames.indexOf(key) !== -1) {
      groups[0][key] = value
    } else {
      groups[1][key] = value
    }
  })
  return groups
}

export function styledCSSTransition<P = {}>(
  transitionAttrs: Partial<TransitionProps>,
  css: Interpolation<P>,
  component?: React.ComponentClass<any>,
): StyledComponentClass<Partial<TransitionProps>, {}> {
  const Transition = ({
    children,
    className,
    ...props
  }: Partial<CSSTransitionProps>) => {
    const [transitionProps] = groupProps(props)
    return (
      <CSSTransition
        classNames={{
          appear: 'appear',
          appearActive: 'appear-active',
          enter: 'enter',
          enterActive: 'enter-active',
          exit: 'exit',
          exitActive: 'exit-active',
        }}
        {...{
          timeout: 0,
          ...transitionAttrs,
          ...transitionProps,
        }}
      >
        {React.createElement(
          component ? component : 'div',
          { className },
          children,
        )}
      </CSSTransition>
    )
  }

  return styled(Transition)`
    ${css};
  `
}
