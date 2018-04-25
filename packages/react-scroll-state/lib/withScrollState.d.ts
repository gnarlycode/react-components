/// <reference types="react" />
import * as React from 'react';
import { ProvidedSсrollState } from './ScrollStateProvider';
export declare function withScrollState<TInner extends ProvidedSсrollState = ProvidedSсrollState, TOutter extends object = {}>(WrappedComponent: React.ReactType<TInner>): React.SFC<TOutter>;
