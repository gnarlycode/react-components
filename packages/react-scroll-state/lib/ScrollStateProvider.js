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
var is_in_browser_1 = require("is-in-browser");
var prop_types_1 = require("prop-types");
var Delegate_1 = require("./Delegate");
// Scroll lock classes
exports.defaultBodyLockClass = 'body-scroll-lock';
exports.defaultHtmlLockClass = 'html-scroll-lock';
exports.contextTypes = {
    scrollState: prop_types_1.object,
};
// Component
var ScrollStateProvider = /** @class */ (function (_super) {
    __extends(ScrollStateProvider, _super);
    function ScrollStateProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.isScrollLocked = false;
        _this.lockersStack = 0;
        _this.scrollEvent = new Delegate_1.Delegate();
        _this.scrollPosition = 0;
        _this.getIsScrollLocked = function () { return _this.isScrollLocked; };
        _this.fireScrollEvent = function () { return _this.scrollEvent.fire(); };
        // Returns current scroll position
        // Or value before  lock if the scroll is locked now
        _this.getScrollPosition = function () {
            if (!_this.isScrollLocked) {
                _this.scrollPosition =
                    window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop ||
                        0;
            }
            return _this.scrollPosition;
        };
        // Scrolls page to given position
        // Or sets `scrollPosition` if scroll is locked to properly restore new value
        _this.setScrollPosition = function (scroll) {
            if (_this.isScrollLocked) {
                _this.scrollPosition = scroll;
                if (_this.body)
                    _this.body.style.top = "-" + scroll + "px";
                _this.scrollEvent.fire();
            }
            else {
                window.scrollTo(0, scroll);
            }
        };
        // Scroll Locker
        _this.lockScroll = function () {
            if (++_this.lockersStack > 1)
                return;
            if (is_in_browser_1.default) {
                var _a = _this.props, _b = _a.bodyLockClass, bodyLockClass = _b === void 0 ? exports.defaultBodyLockClass : _b, _c = _a.htmlLockClass, htmlLockClass = _c === void 0 ? exports.defaultHtmlLockClass : _c;
                var scroll_1 = _this.getScrollPosition();
                _this.setScrollLockState(true);
                if (_this.body)
                    _this.body.classList.add(bodyLockClass);
                if (_this.html)
                    _this.html.classList.add(htmlLockClass);
                if (_this.body)
                    _this.body.style.top = "-" + scroll_1 + "px";
            }
            else {
                _this.setScrollLockState(true);
            }
        };
        // Scroll Unlocker
        _this.unlockScroll = function () {
            if (--_this.lockersStack > 0)
                return;
            if (is_in_browser_1.default) {
                var _a = _this.props, _b = _a.bodyLockClass, bodyLockClass = _b === void 0 ? exports.defaultBodyLockClass : _b, _c = _a.htmlLockClass, htmlLockClass = _c === void 0 ? exports.defaultHtmlLockClass : _c;
                if (_this.body)
                    _this.body.classList.remove(bodyLockClass);
                if (_this.html)
                    _this.html.classList.remove(htmlLockClass);
                if (_this.body)
                    _this.body.style.top = '';
                var scroll_2 = _this.getScrollPosition();
                window.scrollTo(0, scroll_2);
                _this.scrollEvent.fire();
                _this.setScrollLockState(false);
            }
            else {
                _this.setScrollLockState(false);
            }
        };
        // Animate Scroll
        _this.animateScroll = function (to, duration) {
            if (duration === void 0) { duration = 350; }
            return new Promise(function (resolve) {
                if (_this.animateRafId) {
                    window.cancelAnimationFrame(_this.animateRafId);
                    _this.animateRafId = undefined;
                }
                var start = _this.getScrollPosition();
                var distance = to - start;
                var startTime;
                if (distance === 0 || _this.isScrollLocked) {
                    if (_this.isScrollLocked)
                        _this.setScrollPosition(start + distance);
                    resolve();
                    return;
                }
                var animateScroll = function (time) {
                    if (!startTime)
                        startTime = time;
                    var currentTime = time - startTime;
                    var prog = currentTime / duration;
                    _this.setScrollPosition(start + prog * distance);
                    if (currentTime < duration) {
                        _this.animateRafId = window.requestAnimationFrame(animateScroll);
                    }
                    else {
                        _this.animateRafId = undefined;
                        resolve();
                    }
                };
                _this.animateRafId = window.requestAnimationFrame(animateScroll);
            });
        };
        if (is_in_browser_1.default) {
            _this.body = document.body;
            _this.html = document.documentElement;
        }
        return _this;
    }
    ScrollStateProvider.prototype.getChildContext = function () {
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
        };
    };
    ScrollStateProvider.prototype.setScrollLockState = function (value) {
        this.isScrollLocked = value;
    };
    ScrollStateProvider.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this.fireScrollEvent, false);
    };
    ScrollStateProvider.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.fireScrollEvent, false);
    };
    ScrollStateProvider.prototype.render = function () {
        return this.props.children;
    };
    ScrollStateProvider.childContextTypes = exports.contextTypes;
    ScrollStateProvider.defaultProps = {
        bodyLockClass: exports.defaultBodyLockClass,
        htmlLockClass: exports.defaultHtmlLockClass,
    };
    return ScrollStateProvider;
}(React.PureComponent));
exports.ScrollStateProvider = ScrollStateProvider;
