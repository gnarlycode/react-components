import * as React from 'react';
import { Interpolation, StyledComponentClass } from 'styled-components';
import { TransitionProps } from 'react-transition-group/Transition';
export declare function styledCSSTransition<P = {}>(transitionAttrs: Partial<TransitionProps>, css: Interpolation<P>, component?: React.ComponentClass<any>): StyledComponentClass<Partial<TransitionProps>, {}>;
