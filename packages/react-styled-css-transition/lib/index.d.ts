/// <reference types="@types/react" />
import * as React from 'react';
import { Interpolation, StyledComponent } from 'styled-components';
import * as CSSTransition from 'react-transition-group/CSSTransition';
import { TransitionProps } from 'react-transition-group/Transition';
export declare function styledCSSTransition<P extends object = {}>(transitionAttrs: Partial<TransitionProps>, css: Interpolation<P>, component?: React.ComponentClass<any>): StyledComponent<React.ComponentClass<CSSTransition.CSSTransitionProps>, Partial<TransitionProps>>;
