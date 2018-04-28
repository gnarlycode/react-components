"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_swipeable_1 = require("react-swipeable");
var react_measure_1 = require("react-measure");
var easeOutCubic = 'cubic-bezier(0.215, 0.610, 0.355, 1.000)';
exports.minmax = function (min, value, max) {
    return Math.max(min, Math.min(max, value));
};
var SCROLL_BREAK_HEIGHT = 50;
// Component
var SwipeableItems = /** @class */ (function (_super) {
    __extends(SwipeableItems, _super);
    function SwipeableItems(props) {
        var _this = _super.call(this, props) || this;
        _this.isScrolling = false;
        _this.swipingDirItems = 0;
        _this.itemsCount = 0;
        _this.pauseInteract = function () {
            if (_this.isClickingPausedTimeout) {
                clearTimeout(_this.isClickingPausedTimeout);
                _this.isClickingPausedTimeout = undefined;
            }
            _this.setState({ isClickingPaused: true });
        };
        _this.unpauseInteract = function () {
            if (!_this.isClickingPausedTimeout) {
                _this.isClickingPausedTimeout = window.setTimeout(function () { return _this.setState({ isClickingPaused: false }); }, 100);
            }
        };
        _this.getIsControlled = function () { return _this.props.current !== undefined; };
        _this.getCurrent = function () {
            return _this.getIsControlled() ? _this.props.current : _this.state.current;
        };
        _this.getItemsCount = function () { return _this.itemsCount; };
        _this.getItemWidth = function () {
            return _this.props.itemWidth !== undefined
                ? _this.props.itemWidth
                : _this.state.itemWidth;
        };
        _this.handleSwipingItemsLeft = function () { return (_this.swipingDirItems = 1); };
        _this.handleSwipingItemsRight = function () { return (_this.swipingDirItems = -1); };
        // Swipe Items
        _this.handleSwiping = function (e, deltaX, deltaY, absX, absY, velocity) {
            var _a = _this.props, onSwiped = _a.onSwiped, onSwiping = _a.onSwiping;
            var isSwiping = _this.state.isSwiping;
            var current = _this.getCurrent();
            var itemWidth = _this.getItemWidth();
            var itemsCount = _this.getItemsCount();
            _this.isScrolling = Boolean(_this.isScrolling ||
                (Math.abs(deltaX) > 10 &&
                    Math.abs(deltaY) > SCROLL_BREAK_HEIGHT &&
                    Math.abs(deltaX) < Math.abs(deltaY)));
            if (_this.isScrolling) {
                _this.setState({ isSwiping: false }, function () {
                    if (onSwiped)
                        onSwiped();
                    _this.resetSwipingStyles();
                });
            }
            if (!_this.container || _this.isScrolling)
                return;
            _this.pauseInteract();
            if (!isSwiping)
                _this.setState({ isSwiping: true });
            var position = exports.minmax(0, current * itemWidth + deltaX, (itemsCount - 1) * itemWidth);
            var transform = "translate3d(" + -position + "px, 0, 0)";
            _this.container.style.transform = transform;
            _this.container.style.webkitTransform = transform;
            if (onSwiping) {
                onSwiping({
                    position: position,
                    progress: (position + itemWidth) / itemWidth,
                });
            }
        };
        _this.handleSwiped = function (e, x, y, isFlick, velocity) {
            if (_this.isScrolling) {
                _this.isScrolling = false;
                return;
            }
            if (!_this.container)
                return;
            var onSwiped = _this.props.onSwiped;
            var current = _this.getCurrent();
            var itemWidth = _this.getItemWidth();
            var itemsCount = _this.getItemsCount();
            // Position Numbers
            var progress = (current * itemWidth + x) / itemWidth;
            var leftItem = Math.floor(progress);
            var rightItem = Math.ceil(progress);
            // Number of slide which is sliding to
            var swipingTo = _this.swipingDirItems === -1 ? leftItem : rightItem;
            // Ratio of sliding distance
            var shiftRatio = _this.swipingDirItems === -1
                ? 1 - (progress - leftItem)
                : 1 - (rightItem - progress);
            // Compute new slide
            var slide = isFlick || shiftRatio > 0.1
                ? // Slide from sliding direction
                    swipingTo
                : // Overslide left
                    _this.swipingDirItems === -1 && current !== rightItem
                        ? rightItem
                        : // Overslide right
                            _this.swipingDirItems === 1 && current !== leftItem
                                ? leftItem
                                : // Same slide
                                    current;
            // Check bounds
            var newCurrent = exports.minmax(0, slide, itemsCount - 1);
            _this.container.style.transition = "transform " + easeOutCubic + " 350ms";
            _this.unpauseInteract();
            _this.setState({ isSwiping: false }, function () {
                if (newCurrent !== current) {
                    _this.setCurrent(newCurrent, function () {
                        if (onSwiped)
                            onSwiped();
                    });
                }
                else {
                    _this.resetSwipingStyles();
                    if (onSwiped)
                        onSwiped();
                }
            });
        };
        _this.setCurrent = function (current, cb) {
            var onChange = _this.props.onChange;
            if (onChange)
                onChange(current);
            _this.setState({ current: current }, cb);
        };
        _this.handleResize = function (_a) {
            var client = _a.client;
            if (client) {
                _this.setState({ itemWidth: client.width }, function () {
                    if (!_this.state.isReady) {
                        setTimeout(function () { return _this.setState({ isReady: true }); }, 0);
                    }
                });
            }
        };
        _this.itemsRef = function (el) { return (_this.container = el); };
        _this.getItemsTransform = function () {
            var current = _this.getCurrent();
            var itemWidth = _this.getItemWidth();
            return "translate3d(" + -current * itemWidth + "px, 0, 0)";
        };
        _this.getViewportStyle = function (renderArgs) {
            var _a = _this.props, style = _a.style, _b = _a.overflowHidden, overflowHidden = _b === void 0 ? true : _b;
            var s = __assign({}, (typeof style === 'function' ? style(renderArgs) : style || {}));
            if (overflowHidden) {
                s.overflow = 'hidden';
            }
            return s;
        };
        _this.getContainerStyle = function (renderArgs) {
            var containerStyle = _this.props.containerStyle;
            return __assign({}, (typeof containerStyle === 'function'
                ? containerStyle(renderArgs)
                : containerStyle || {}), { display: 'flex', flexDirection: 'row', position: 'relative', transform: _this.getItemsTransform(), transition: _this.state.isReady && !_this.state.isSwiping
                    ? "transform " + easeOutCubic + " 350ms"
                    : '', userSelect: 'none', width: 'fit-content', willChange: 'transform' });
        };
        _this.state = {
            current: props.defaultCurrent || 0,
            isClickingPaused: false,
            isReady: props.itemWidth !== undefined,
            isSwiping: false,
            itemWidth: -1,
        };
        return _this;
    }
    SwipeableItems.prototype.resetSwipingStyles = function () {
        if (!this.container)
            return;
        var transform = this.getItemsTransform();
        this.container.style.transform = transform;
        this.container.style.webkitTransform = transform;
    };
    SwipeableItems.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, className = _a.className, containerClassName = _a.containerClassName, innerRef = _a.innerRef, render = _a.render, trackMouse = _a.trackMouse;
        var _b = this.state, isClickingPaused = _b.isClickingPaused, isSwiping = _b.isSwiping, isReady = _b.isReady;
        var renderArgs = {
            current: this.getCurrent(),
            isClickingPaused: isClickingPaused,
            isReady: isReady,
            isSwiping: isSwiping,
            setCurrent: this.setCurrent,
        };
        var renderChild = function (ch) {
            return ch && typeof ch === 'function'
                ? ch(renderArgs)
                : ch && typeof ch !== 'function'
                    ? ch
                    : undefined;
        };
        var renderChildren = renderChild(children) || renderChild(render) || null;
        this.itemsCount = React.Children.count(renderChildren);
        return (React.createElement(react_measure_1.default, { client: this.props.itemWidth === undefined, onResize: this.handleResize, children: function (_a) {
                var measureRef = _a.measureRef;
                return (React.createElement(react_swipeable_1.default, { className: className, innerRef: function (el) {
                        measureRef(el);
                        if (innerRef)
                            innerRef(el);
                    }, onSwiped: _this.handleSwiped, onSwiping: _this.handleSwiping, onSwipingLeft: _this.handleSwipingItemsLeft, onSwipingRight: _this.handleSwipingItemsRight, style: _this.getViewportStyle(renderArgs), trackMouse: trackMouse, children: React.createElement("div", { className: containerClassName, ref: _this.itemsRef, style: _this.getContainerStyle(renderArgs), children: renderChildren }) }));
            } }));
    };
    return SwipeableItems;
}(React.PureComponent));
exports.SwipeableItems = SwipeableItems;
