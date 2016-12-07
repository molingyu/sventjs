'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by shitake on 16-10-26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fibers = require('fibers');

var _fibers2 = _interopRequireDefault(_fibers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class EventCallbackFiber.
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
var EventCallbackFiber = function () {
    function EventCallbackFiber(em, name, callback, info) {
        var _this = this;

        _classCallCheck(this, EventCallbackFiber);

        this.objectId = Date.now().toString();
        this.name = name;
        this.info = info;
        this.callback = callback;
        this.alive = true;
        var self = this;
        this.fiber = new _fibers2.default(function () {
            self.callback(em, self.info);
            self.fiber = null;
            _this.alive = false;
        });
        if (callback.immediately) this.next();
    }

    _createClass(EventCallbackFiber, [{
        key: 'next',
        value: function next() {
            if (!this.fiber) {
                return console.error('Fiber(' + this.name + ') is not alive!');
            }
            if (this.return) {
                this.fiber = null;
                this.alive = false;
            } else {
                this.return = this.fiber.run();
            }
        }
    }]);

    return EventCallbackFiber;
}();

exports.default = EventCallbackFiber;