'use strict';

var _eventManger = require('./svent/eventManger');

var _eventManger2 = _interopRequireDefault(_eventManger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Svent
 */
var Svent = {
    EventManger: _eventManger2.default,
    /**
     * @method run
     * @description Run a Svent server.
     * @param {EventManger} eventManger a EventManger object.
     * @param {Function} func callback func.
     */
    run: function run(eventManger, func) {
        this.eventManger = eventManger || new this.EventManger();
        this.isStop = false;
        func(this.eventManger);
        while (!this.isStop) {
            this.eventManger.update();
        }
    },
    /**
     * @method stop
     * @description Stop Svent server.
     */
    stop: function stop() {
        var _this = this;

        this.eventManger.onAsync('isEventMangerStop', {}, function (em) {
            em.isOk(function () {
                return em.isStop();
            });
            _this.isStop = true;
        });
        this.eventManger.stop();
    },
    /**
     * @method kill
     * @description Kill Svent server.
     */
    kill: function kill() {
        this.isStop = true;
    }
}; /**
    * Created by shitake on 16-10-26.
    */


module.exports = Svent;