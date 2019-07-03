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
var withScrollState_1 = require("./withScrollState");
var is_in_browser_1 = require("is-in-browser");
// ScrollLock Component
exports.ScrollLocker = withScrollState_1.withScrollState(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        // For ssr
        if (!is_in_browser_1.default)
            _this.props.scrollState.lockScroll();
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        this.props.scrollState.lockScroll();
    };
    class_1.prototype.componentWillUnmount = function () {
        this.props.scrollState.unlockScroll();
    };
    class_1.prototype.render = function () {
        return null;
    };
    return class_1;
}(React.Component)));
