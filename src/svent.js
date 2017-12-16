/**
 * Created by shitake on 16-10-26.
 */
import EventManager from './svent/eventManager'

/**
 * @module Svent
 */
const Svent = {
    EventManager: EventManager,
    /**
     * @method run
     * @description Run a Svent server.
     * @param {EventManager} eventManager a EventManager object.
     * @param {Function} func callback func.
     */
    run: function (eventManager, func) {
        this.eventManager = eventManager || new this.EventManager();
        this.isStop = false;
        func(this.eventManager);
        while(!this.isStop) {
            this.eventManager.update()
        }
    },
    /**
     * @method stop
     * @description Stop Svent server.
     */
    stop: function () {
        this.eventManager.onAsync('isEventManagerStop', {}, (em)=>{
            em.isOk(()=>{ return em.isStop() });
            this.isStop = true
        });
        this.eventManager.stop()
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