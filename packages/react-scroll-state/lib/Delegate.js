"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Delegate = /** @class */ (function () {
    function Delegate() {
        this.listeners = [];
    }
    Delegate.prototype.fire = function () {
        this.listeners.forEach(function (fn) { return fn(); });
    };
    Delegate.prototype.subscribe = function (fn) {
        if (this.listeners.indexOf(fn) === -1) {
            this.listeners.push(fn);
        }
    };
    Delegate.prototype.unsubscribe = function (fn) {
        var index = this.listeners.indexOf(fn);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    };
    return Delegate;
}());
exports.Delegate = Delegate;
