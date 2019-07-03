import * as React from 'react'
import styled, { Interpolation, StyledComponent } from 'styled-components'
import * as CSSTransition from 'react-transition-group/CSSTransition'
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

export function styledCSSTransition<P extends object = {}>(
  transitionAttrs: Partial<TransitionProps>,
  css: Interpolation<P>,
  component?: React.ComponentClass<any>,
): StyledComponent<
  React.ComponentClass<CSSTransition.CSSTransitionProps>,
  Partial<TransitionProps>
> {
  const Transition = ({
    children,
    className,
    ...props
  }: Partial<CSSTransition.CSSTransitionProps>) => {
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
