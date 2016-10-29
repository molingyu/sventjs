'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by shitake on 16-10-26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _EventCallbackFiber = require('./EventCallbackFiber');

var _EventCallbackFiber2 = _interopRequireDefault(_EventCallbackFiber);

var _fibers = require('fibers');

var _fibers2 = _interopRequireDefault(_fibers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManger = function () {
    function EventManger() {
        _classCallCheck(this, EventManger);

        this.events = new Map();
        this.self = null;
        this.eventCallbackFibers = [];
        this.timers = new Map();
        this.counters = new Map();
        this.timerFilters = new Map();
        this.counterfilters = new Map();
    }

    _createClass(EventManger, [{
        key: 'update',
        value: function update() {
            var _this = this;

            if (this.eventCallbackFibers.size != 0) {
                this.eventCallbackFibers.forEach(function (obj) {
                    _this.self = obj;
                    obj.next();
                    _this.self = null;
                    if (!obj.isAlive()) _this.eventCallbackFibers.splice(_this.eventCallbackFibers.indexOf(obj), 1);
                });
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(name, info) {
            var _this2 = this;

            var event = this.events[name];
            if (event) {
                event.map(function (callback) {
                    _this2.eventCallbackFibers.push(new _EventCallbackFiber2.default(_this2, name, callback, info));
                });
            }
        }
    }, {
        key: 'on',
        value: function on(name, conf, callback) {
            if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == String) name = Symbol(name);
            if (name == Symbol.for('isEventMangerStop')) {
                Error("error:The event(isEventMangerStop) can only have one callback.");
            }
            var event = this.events[name] = this.events[name] ? this.events[name] : new _event2.default(name, conf.type);
            if (conf.index == undefined) {
                event.push(callback);
            } else {
                event[index] = callback;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.trigger('eventMangerStop');
            this.trigger('isEventMangerStop');
        }
    }, {
        key: 'isStop',
        value: function isStop() {
            return this.eventCallbackFibers.length == 1 && this.eventCallbackFibers[0].name == 'isEventMangerStop';
        }

        // helper function

    }, {
        key: 'delete',
        value: function _delete() {
            this.afterDelete();
            _fibers2.default.yield(true);
        }
    }, {
        key: 'afterDelete',
        value: function afterDelete() {
            this.events[this.self.name].delete(this.self.callback);
        }
    }, {
        key: 'isOk',
        value: function isOk(callback) {
            while (true) {
                if (callback()) break;
                _fibers2.default.yield();
            }
        }
    }, {
        key: 'filter',
        value: function filter(callback) {
            if (!callback) _fibers2.default.yield(true);
        }
    }, {
        key: 'wait',
        value: function wait(value) {
            if (this.timers[this.self.objectId] == undefined) this.timers[this.self.objectId] = Date.now();
            while (true) {
                if (Date.now() - this.timers[this.self.objectId] > value * 1000) break;
                _fibers2.default.yield();
            }
            this.timers.delete(this.self.objectId);
        }
    }, {
        key: 'times',
        value: function times(value) {
            if (this.counters[this.self.objectId]) {
                this.counters[this.self.objectId] += 1;
            } else {
                this.counters[this.self.objectID] = 1;
            }
            while (true) {
                if (this.counters[this.self.objectId] > value) {
                    this.counters.delete(this.self.objectId);
                    break;
                }
                _fibers2.default.yield();
            }
        }
    }, {
        key: 'waitFilter',
        value: function waitFilter(value) {
            if (!this.timerFilters[this.self.objectId]) return this.timerFilters[this.self.objectId] = Date.now();
            while (true) {
                if (Date.now() - this.timerFilters[this.self.objectId] > value * 1000) {
                    this.timerFilters[this.self.objectId] = Date.now();
                    break;
                }
                _fibers2.default.yield(true);
            }
        }
    }, {
        key: 'timesFilter',
        value: function timesFilter(value) {
            if (this.counterfilters[this.self.objectId]) {
                this.counterfilters[this.self.objectId] += 1;
            } else {
                return this.counterfilters[this.self.objectId] = 1;
            }
            while (true) {
                if (this.counterfilters[this.self.objectId] > value) {
                    this.counterfilters[this.self.objectId] = 1;
                    break;
                }
                _fibers2.default.yield(true);
            }
        }
    }]);

    return EventManger;
}();

exports.default = EventManger;