"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ScrollStateProvider_1 = require("./ScrollStateProvider");
// Scroll State HOC
function withScrollState(WrappedComponent) {
    var ScrollStateHOC = function (props, context) {
        return React.createElement(WrappedComponent, __assign({}, props, context));
    };
    ScrollStateHOC.contextTypes = ScrollStateProvider_1.contextTypes;
    return ScrollStateHOC;
}
exports.withScrollState = withScrollState;
