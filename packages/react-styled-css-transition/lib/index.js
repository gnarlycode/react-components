"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var CSSTransition_1 = require("react-transition-group/CSSTransition");
var transitionPropsNames = [
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
];
var groupProps = function (props) {
    var groups = [{}, {}];
    Object.entries(props).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (transitionPropsNames.indexOf(key) !== -1) {
            groups[0][key] = value;
        }
        else {
            groups[1][key] = value;
        }
    });
    return groups;
};
function styledCSSTransition(transitionAttrs, css, component) {
    var Transition = function (_a) {
        var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
        var transitionProps = groupProps(props)[0];
        return (React.createElement(CSSTransition_1.default, __assign({ classNames: {
                appear: 'appear',
                appearActive: 'appear-active',
                enter: 'enter',
                enterActive: 'enter-active',
                exit: 'exit',
                exitActive: 'exit-active',
            } }, __assign({ timeout: 0 }, transitionAttrs, transitionProps)), React.createElement(component ? component : 'div', { className: className }, children)));
    };
    return styled_components_1.default(Transition)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", ";\n  "], ["\n    ", ";\n  "])), css);
}
exports.styledCSSTransition = styledCSSTransition;
var templateObject_1;
