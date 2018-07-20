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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_config_1 = require("react-router-config");
exports.getDataFetchers = function (path, routes, fetchContext) {
    return Promise.all(react_router_config_1.matchRoutes(routes, path)
        .map(function (p) { return p.route.fetchData && p.route.fetchData(fetchContext, p.match); })
        .filter(function (x) { return Boolean(x); }));
};
function withRouteFetch(routes) {
    return function (WrappedComponent) {
        return react_router_dom_1.withRouter(/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.actualizeData = function () {
                    var _a = _this.props, fetchContext = _a.fetchContext, location = _a.location;
                    if (location) {
                        Promise.resolve(exports.getDataFetchers(location.pathname, routes, fetchContext));
                    }
                };
                return _this;
            }
            class_1.prototype.componentDidMount = function () {
                this.actualizeData();
            };
            class_1.prototype.componentDidUpdate = function (prevProps) {
                var l = this.props.location;
                var pl = prevProps.location;
                if (pl && l && pl.pathname !== l.pathname)
                    this.actualizeData();
            };
            class_1.prototype.render = function () {
                return React.createElement(WrappedComponent, this.props);
            };
            return class_1;
        }(React.PureComponent)));
    };
}
exports.withRouteFetch = withRouteFetch;
