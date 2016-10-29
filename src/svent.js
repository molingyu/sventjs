/**
 * Created by shitake on 16-10-26.
 */

import EventManger from './svent/eventManger'

const Svent = {
    EventManger: EventManger,
    run: function (eventManger, func) {
        this.eventManger = eventManger || new this.EventManger();
        this.isStop = false;
        func(this.eventManger);
        while(!this.isStop) {
            this.eventManger.update()
        }
    },
    stop: function () {
        this.eventManger.on('isEventMangerStop', {}, (em)=>{
            em.isOk(()=>{ return em.isStop() });
            this.isStop = true
        });
        this.eventManger.stop()
    },

    kill: function () {
        this.isStop = true
    },
};

module.exports = Svent;