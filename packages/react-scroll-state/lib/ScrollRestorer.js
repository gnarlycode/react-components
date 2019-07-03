"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var recompose_1 = require("recompose");
var react_router_1 = require("react-router");
var withScrollState_1 = require("./withScrollState");
var ready = function (callback) {
    if (document.readyState !== 'loading') {
        callback();
    }
    else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};
// Constants
var storagePrefix = 'saved-scroll-';
// Component
exports.ScrollRestorer = recompose_1.compose(react_router_1.withRouter, withScrollState_1.withScrollState)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.componentDidMount = function () {
        var _this = this;
        ready(function () { return _this.checkHash(); });
    };
    // Manages scroll position between history steps
    class_1.prototype.componentWillUpdate = function (nextProps) {
        var current = this.props.location.key;
        var next = nextProps.location.key;
        if (current !== next) {
            sessionStorage.setItem(storagePrefix + current, String(this.props.scrollState.getScrollPosition()));
        }
    };
    // Manages scroll position between history steps
    class_1.prototype.componentDidUpdate = function (prevProps) {
        var current = this.props.location.key;
        var prev = prevProps.location.key;
        if (current !== prev) {
            var top_1 = Number(sessionStorage.getItem(storagePrefix + current) || 0);
            this.props.scrollState.setScrollPosition(top_1);
        }
        this.checkHash();
    };
    class_1.prototype.checkHash = function () {
        if (this.props.location.hash) {
            var el = document.getElementById(this.props.location.hash.substr(1));
            if (el) {
                var elParent = el.offsetParent;
                this.props.scrollState.setScrollPosition(el.offsetTop +
                    Number(elParent && typeof elParent.offsetTop === 'number'
                        ? elParent.offsetTop
                        : 0));
            }
        }
    };
    class_1.prototype.render = function () {
        return null;
    };
    return class_1;
}(React.Component)));
