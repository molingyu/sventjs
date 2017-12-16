'use strict';

var _eventManager = require('./svent/eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Svent
 */
var Svent = {
    EventManager: _eventManager2.default,
    /**
     * @method run
     * @description Run a Svent server.
     * @param {EventManager} eventManager a EventManager object.
     * @param {Function} func callback func.
     */
    run: function run(eventManager, func) {
        this.eventManager = eventManager || new this.EventManager();
        this.isStop = false;
        func(this.eventManager);
        while (!this.isStop) {
            this.eventManager.update();
        }
    },
    /**
     * @method stop
     * @description Stop Svent server.
     */
    stop: function stop() {
        var _this = this;

        this.eventManager.onAsync('isEventManagerStop', {}, function (em) {
            em.isOk(function () {
                return em.isStop();
            });
            _this.isStop = true;
        });
        this.eventManager.stop();
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