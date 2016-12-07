/**
 * Created by shitake on 16-10-26.
 */
import EventManger from './svent/eventManger'

/**
 * @module Svent
 */
const Svent = {
    EventManger: EventManger,
    /**
     * @method run
     * @description Run a Svent server.
     * @param {EventManger} eventManger a EventManger object.
     * @param {Function} func callback func.
     */
    run: function (eventManger, func) {
        this.eventManger = eventManger || new this.EventManger();
        this.isStop = false;
        func(this.eventManger);
        while(!this.isStop) {
            this.eventManger.update()
        }
    },
    /**
     * @method stop
     * @description Stop Svent server.
     */
    stop: function () {
        this.eventManger.onAsync('isEventMangerStop', {}, (em)=>{
            em.isOk(()=>{ return em.isStop() });
            this.isStop = true
        });
        this.eventManger.stop()
    },
    /**
     * @method kill
     * @description Kill Svent server.
     */
    kill: function () {
        this.isStop = true
    },
};

module.exports = Svent;