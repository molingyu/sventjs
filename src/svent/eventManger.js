/**
 * Created by shitake on 16-10-26.
 */
import Event from './event'
import EventCallbackFiber from './eventCallbackFiber'
import Fiber from 'fibers'

/**
 * Class EventManger.
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
class EventManger {
    /**
     * Create a eventManger.
     */
    constructor() {
        this.events = new Map();
        this.self = null;
        this.eventCallbackFibers = [];
        this.timers = new Map();
        this.counters = new Map();
        this.timerFilters = new Map();
        this.counterfilters = new Map();
    }

    /**
     * Update evnManger.
     */
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

    /**
     * trigger a event.
     * @param {String} name - The event name.
     * @param {Object} info - The event info.
     */
    trigger(name, info) {
        let event = this.events[name];
        if(event) {
            event.map(callback => {
                this.eventCallbackFibers.push(new EventCallbackFiber(this, name, callback, info))
            })
        }
    }

    /**
     * on a event callback.
     * @param {String} name - The event name.
     * @param {Object} conf - The event callback conf.
     * @param {EventManger~eventCallback} callback - The event callback.
     */
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
    /**
     * This eventCallback is added a event event.
     * @callback EventManger~eventCallback
     * @param {EventManger} eventManger
     * @param {Object} callback info.
     */

    /**
     * Stop EventManger.
     */
    stop() {
        this.trigger('eventMangerStop');
        this.trigger('isEventMangerStop')
    }

    /**
     * Determines whether the EventManger is stopped.
     */
    isStop() {
        return this.eventCallbackFibers.length == 1 && this.eventCallbackFibers[0].name == 'isEventMangerStop'
    }

    // helper function

    /**
     * Helper methods.<br>
     * Delete this callback.
     */
    delete() {
        this.afterDelete();
        Fiber.yield(true)
    }

    /**
     * Helper methods.<br>
     * Delete this callback.
     */
    afterDelete() {
        let event = this.events[this.self.name];
        let index = event.indexOf(this.self.callback);
        event.splice(index, 1)
    }

    /**
     * Helper methods.<br>
     * isok.
     * @param {EventManger~isOkCallback} callback
     */
    isOk(callback) {
        while(true){
            if(callback()) break;
            Fiber.yield()
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
    filter(callback) {
        if(!callback()) Fiber.yield(true)
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
    wait(value) {
        if(this.timers[this.self.objectId] == undefined) this.timers[this.self.objectId] = Date.now();
        while(true) {
            if(Date.now() - this.timers[this.self.objectId] > value * 1000) break;
            Fiber.yield()
        }
        this.timers.delete(this.self.objectId)
    }

    /**
     * Helper methods.<br>
     * @param {Number} value - times.
     */
    times(value) {
        if (this.counters[this.self.name]) {
            this.counters[this.self.name] += 1;
        } else {
            this.counters[this.self.name] = 1;
        }
        while(true) {
            if(this.counters[this.self.name] >= value) {
                this.counters[this.self.name] = 0;
                break
            }
            Fiber.yield()
        }
    }

    /**
     * Helper methods.<br>
     * @param {Number} value - sec.
     */
    waitFilter(value) {
        if(!this.timerFilters[this.self.name]) this.timerFilters[this.self.name] = Date.now();
        while(true){
            if(Date.now() - this.timerFilters[this.self.name] > value * 1000) {
                this.timerFilters[this.self.name] = Date.now();
                break
            }
            Fiber.yield(true)
        }
    }

    /**
     * Helper methods.<br>
     * @param {Number} value - times.
     */
    timesFilter(value) {
        if( this.counterfilters[this.self.name]) {
            this.counterfilters[this.self.name] += 1
        } else {
            return this.counterfilters[this.self.name] = 1
        }
        while(true) {
            if( this.counterfilters[this.self.name] > value) {
                this.counterfilters[this.self.name] = 0;
                break
            }
            Fiber.yield(true)
        }
    }
}


export default EventManger