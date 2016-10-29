'use strict';

var _eventManger = require('./svent/eventManger');

var _eventManger2 = _interopRequireDefault(_eventManger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Svent = {
    run: function run(eventManger, func) {
        this.eventManger = eventManger || new _eventManger2.default();
        this.isStop = false;
        func(this.eventManger);
        while (!this.isStop) {
            this.eventManger.update();
        }
    },
    stop: function stop() {
        var _this = this;

        this.eventManger.on('isEventMangerStop', {}, function (em) {
            em.isOk(function () {
                return em.isStop();
            });
            _this.isStop = true;
        });
        this.eventManger.stop();
    },

    kill: function kill() {
        this.isStop = true;
    }
}; /**
    * Created by shitake on 16-10-26.
    */

module.exports = Svent;