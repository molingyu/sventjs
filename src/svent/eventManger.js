/**
 * Created by shitake on 16-10-26.
 */
import Event from './event'
import EventCallbackFiber from './EventCallbackFiber'
import Fiber from 'fibers'

export default class EventManger {

    constructor() {
        this.events = new Map();
        this.self = null;
        this.eventCallbackFibers = [];
        this.timers = new Map();
        this.counters = new Map();
        this.timerFilters = new Map();
        this.counterfilters = new Map();
    }

    update() {
        if(this.eventCallbackFibers.size != 0) {
            this.eventCallbackFibers.forEach(obj => {
                this.self = obj;
                obj.next();
                this.self = null;
                if(!obj.isAlive()) this.eventCallbackFibers.splice(this.eventCallbackFibers.indexOf(obj), 1)
            })
        }
    }

    trigger(name, info) {
        let event = this.events[name];
        if(event) {
            event.map(callback => {
                this.eventCallbackFibers.push(new EventCallbackFiber(this, name, callback, info))
            })
        }
    }

    on(name, conf, callback) {
        if(typeof name == String) name = Symbol(name);
        if(name == Symbol.for('isEventMangerStop')){
            Error("error:The event(isEventMangerStop) can only have one callback.")
        }
        let event = this.events[name] = this.events[name] ? this.events[name] : new Event(name, conf.type);
        if(conf.index == undefined) {
            event.push(callback)
        } else {
            event[index] = callback
        }
    }

    stop() {
        this.trigger('eventMangerStop');
        this.trigger('isEventMangerStop')
    }

    isStop() {
        return this.eventCallbackFibers.length == 1 && this.eventCallbackFibers[0].name == 'isEventMangerStop'
    }

    // helper function

    delete() {
        this.afterDelete();
        Fiber.yield(true)
    }

    afterDelete() {
        this.events[this.self.name].delete(this.self.callback)
    }

    isOk(callback) {
        while(true){
            if(callback()) break;
            Fiber.yield()
        }
    }

    filter(callback) {
        if(!callback) Fiber.yield(true)
    }

    wait(value) {
        if(this.timers[this.self.objectId] == undefined) this.timers[this.self.objectId] = Date.now();
        while(true) {
            if(Date.now() - this.timers[this.self.objectId] > value * 1000) break;
            Fiber.yield()
        }
        this.timers.delete(this.self.objectId)
    }

    times(value) {
        if (this.counters[this.self.objectId]) {
            this.counters[this.self.objectId] += 1;
        } else {
            this.counters[this.self.objectID] = 1;
        }
        while(true) {
            if(this.counters[this.self.objectId] > value) {
                this.counters.delete(this.self.objectId);
                break
            }
            Fiber.yield()
        }
    }

    waitFilter(value) {
        if(!this.timerFilters[this.self.objectId]) return this.timerFilters[this.self.objectId] = Date.now();
        while(true){
            if(Date.now() - this.timerFilters[this.self.objectId] > value * 1000) {
                this.timerFilters[this.self.objectId] = Date.now();
                break
            }
            Fiber.yield(true)
        }
    }

    timesFilter(value) {
        if( this.counterfilters[this.self.objectId]) {
            this.counterfilters[this.self.objectId] += 1
        } else {
            return this.counterfilters[this.self.objectId] = 1
        }
        while(true) {
            if( this.counterfilters[this.self.objectId] > value) {
                this.counterfilters[this.self.objectId] = 1;
                break
            }
            Fiber.yield(true)
        }
    }
}
