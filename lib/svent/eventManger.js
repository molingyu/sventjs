'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by shitake on 16-10-26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _eventCallbackFiber = require('./eventCallbackFiber');

var _eventCallbackFiber2 = _interopRequireDefault(_eventCallbackFiber);

var _fibers = require('fibers');

var _fibers2 = _interopRequireDefault(_fibers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class EventManger.
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
var EventManger = function () {
    /**
     * Create a eventManger.
     */
    function EventManger() {
        _classCallCheck(this, EventManger);

        this.events = new Map();
        this.eventCallbackFibers = [];
        this.eventCallbackFibers.delete = function (obj) {
            this.splice(this.indexOf(obj), 1);
        };
        this.timers = new Map();
        this.counters = new Map();
        this.timerFilters = new Map();
        this.counterfilters = new Map();
    }

    /**
     * Update evnManger.
     */


    _createClass(EventManger, [{
        key: 'update',
        value: function update() {
            var _this = this;

            if (this.eventCallbackFibers.size != 0) {
                this.eventCallbackFibers.forEach(function (obj) {
                    _this.self = obj;
                    obj.next();
                    _this.self = null;
                    if (!obj.alive) _this.eventCallbackFibers.delete(obj);
                });
            }
        }

        /**
         * trigger a event.
         * @param {String} name - The event name.
         * @param {Object} info - The event info.
         */

    }, {
        key: 'trigger',
        value: function trigger(name) {
            var _this2 = this;

            var info = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var event = this.events[name];
            if (event) {
                event.map(function (callback) {
                    if (callback.async) {
                        _this2.eventCallbackFibers.push(new _eventCallbackFiber2.default(_this2, name, callback, info));
                    } else {
                        _this2.eventCallbackFibers.push(callback);
                    }
                });
            }
        }

        /**
         * change event info.
         * @param name - event name.
         * @param key - event info key.
         * @param value event info value.
         */

    }, {
        key: 'eventInfo',
        value: function eventInfo(name, key, value) {
            var event = this.events[name];
            if (event) {
                event.info[key] = value;
            }
        }

        /**
         * Whether to include the specified event.
         * @param name
         * @returns {boolean}
         */

    }, {
        key: 'have',
        value: function have(name) {
            return this.events[name] != void 0;
        }
    }, {
        key: '_on',
        value: function _on(name, conf, callback, immediately) {
            if (name == 'isEventMangerStop') {
                Error("error:The event(isEventMangerStop) can only have one callback.");
            }
            var event = this.events[name] = this.events[name] ? this.events[name] : new _event2.default(name, conf.info);
            callback.immediately = immediately;
            conf.index == void 0 ? event.push(callback) : event[index] = callback;
        }

        /**
         * on a async event callback.
         * @param {String} name - The event name.
         * @param {Object} conf - The event callback conf.
         * @param {EventManger~eventCallback} callback - The event callback.
         * @param {Boolean} immediately
         */

    }, {
        key: 'onAsync',
        value: function onAsync(name, conf, callback) {
            var immediately = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            callback.async = true;
            this._on(name, conf, callback, immediately);
        }

        /**
         * on a event callback.
         * @param {String} name - The event name.
         * @param {Object} conf - The event callback conf.
         * @param {EventManger~eventCallback} callback - The event callback.
         * @param {Boolean} immediately
         */

    }, {
        key: 'on',
        value: function on(name, conf, callback) {
            var immediately = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            callback.async = false;
            callback.name = name;
            callback.info = conf.info;
            callback.alive = true;
            callback.next = function () {
                callback.alive = false;
                return this();
            };
            this._on(name, conf, callback, immediately);
        }
        /**
         * This eventCallback is added a event event.
         * @callback EventManger~eventCallback
         * @param {EventManger} eventManger
         * @param {Object} callback info.
         */

        /**
         * Stop EventManger.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.trigger('eventMangerStop');
            this.trigger('isEventMangerStop');
        }

        /**
         * Determines whether the EventManger is stopped.
         */

    }, {
        key: 'isStop',
        value: function isStop() {
            return this.eventCallbackFibers.length == 1 && this.eventCallbackFibers[0].name == 'isEventMangerStop';
        }

        // helper function

        /**
         * kill the designated event callback.
         * @param {String|RegExp} name - The event name. It can be a regexp(exact match).
         */

    }, {
        key: 'killEventCallback',
        value: function killEventCallback(name) {
            var _this3 = this;

            if (typeof name == "string") {
                this.eventCallbackFibers.forEach(function (obj) {
                    if (obj.name == name) _this3.eventCallbackFibers.delete(obj);
                });
            } else {
                this.eventCallbackFibers.forEach(function (obj) {
                    if (obj.name.match(name) == obj.name) _this3.eventCallbackFibers.delete(obj);
                });
            }
        }

        /**
         * if the event callback is running, it returns true.
         * @param {String|RegExp} name - The event name. It can be a regexp(exact match).
         * @returns {boolean}
         */

    }, {
        key: 'isEventCallbackRun',
        value: function isEventCallbackRun(name) {
            var back = false;
            if (typeof name == "string") {
                this.eventCallbackFibers.forEach(function (obj) {
                    if (obj.name == name) return back = true;
                });
            } else {
                this.eventCallbackFibers.forEach(function (obj) {
                    if (obj.name.match(name) == obj.name) return back = true;
                });
            }
            return back;
        }

        /**
         * Helper methods.<br>
         * Delete this callback.
         */

    }, {
        key: 'delete',
        value: function _delete() {
            this.afterDelete();
            _fibers2.default.yield(true);
        }

        /**
         * Helper methods.<br>
         * Delete this callback.
         */

    }, {
        key: 'afterDelete',
        value: function afterDelete() {
            var event = this.events[this.self.name];
            var index = event.indexOf(this.self.callback);
            event.splice(index, 1);
        }

        /**
         * Helper methods.<br>
         * isOk.
         * @param {EventManger~isOkCallback} callback
         */

    }, {
        key: 'isOk',
        value: function isOk(callback) {
            while (true) {
                if (callback()) break;
                _fibers2.default.yield();
            }
        }
        /**
         * This isOkCallback is added a event event.
         * @callback EventManger~isOkCallback
         * @return {Boolean} The callback function executes the result.
         */

        /**
         * Helper methods.<br>
         * @param {EventManger~filterCallback} callback
         */

    }, {
        key: 'filter',
        value: function filter(callback) {
            if (!callback()) _fibers2.default.yield(true);
        }
        /**
         * This filterCallback is added a event event.
         * @callback EventManger~filterCallback
         * @return {Boolean} The callback function executes the result.
         */

        /**
         * Helper methods.<br>
         * @param {Number} value - sec.
         */

    }, {
        key: 'wait',
        value: function wait(value) {
            if (this.timers[this.self.objectId] == void 0) this.timers[this.self.objectId] = Date.now();
            while (true) {
                if (Date.now() - this.timers[this.self.objectId] > value * 1000) break;
                _fibers2.default.yield();
            }
            this.timers.delete(this.self.objectId);
        }

        /**
         * Helper methods.<br>
         * @param {Number} value - times.
         */

    }, {
        key: 'times',
        value: function times(value) {
            if (this.counters[this.self.name]) {
                this.counters[this.self.name] += 1;
            } else {
                this.counters[this.self.name] = 1;
            }
            while (true) {
                if (this.counters[this.self.name] >= value) {
                    this.counters[this.self.name] = 0;
                    break;
                }
                _fibers2.default.yield();
            }
        }

        /**
         * Helper methods.<br>
         * @param {Number} value - sec.
         */

    }, {
        key: 'waitFilter',
        value: function waitFilter(value) {
            if (!this.timerFilters[this.self.name]) this.timerFilters[this.self.name] = Date.now();
            while (true) {
                if (Date.now() - this.timerFilters[this.self.name] > value * 1000) {
                    this.timerFilters[this.self.name] = Date.now();
                    break;
                }
                _fibers2.default.yield(true);
            }
        }

        /**
         * Helper methods.<br>
         * @param {Number} value - times.
         */

    }, {
        key: 'timesFilter',
        value: function timesFilter(value) {
            if (this.counterfilters[this.self.name]) {
                this.counterfilters[this.self.name] += 1;
            } else {
                return this.counterfilters[this.self.name] = 1;
            }
            while (true) {
                if (this.counterfilters[this.self.name] > value) {
                    this.counterfilters[this.self.name] = 0;
                    break;
                }
                _fibers2.default.yield(true);
            }
        }
    }]);

    return EventManger;
}();

exports.default = EventManger;