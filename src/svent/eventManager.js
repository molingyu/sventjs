/**
 * Created by shitake on 16-10-26.
 */
import Event from './event'
import EventCallbackFiber from './eventCallbackFiber'
import Fiber from 'fibers'

/**
 * Class EventManager.
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
class EventManager {
    /**
     * Create a eventManager.
     */
    constructor() {
        this.events = new Map();
        this.eventCallbackFibers = [];
        this.eventCallbackFibers.delete = function (obj) {
            this.splice(this.indexOf(obj), 1)
        };
        this.timers = new Map();
        this.counters = new Map();
        this.timerFilters = new Map();
        this.counterfilters = new Map();
    }

    /**
     * Update evnManager.
     */
    update() {
        if(this.eventCallbackFibers.size != 0) {
            this.eventCallbackFibers.forEach(obj => {
                this.self = obj;
                obj.next();
                this.self = null;
                if(!obj.alive) this.eventCallbackFibers.delete(obj)
            })
        }
    }

    /**
     * trigger a event.
     * @param {String} name - The event name.
     * @param {Object} info - The event info.
     */
    trigger(name, info = {}) {
        let event = this.events[name];
        if(event) {
            event.map(callback => {
                if(callback.async) {
                    this.eventCallbackFibers.push(new EventCallbackFiber(this, name, callback, info))
                } else {
                    if(callback.immediately){
                        callback(this, info)
                    } else {
                        let callbackFiber = {
                            name: name,
                            info: info,
                            alive: true,
                            callback: callback,
                            next: function () {
                                callback(this, this.info);
                                this.alive = false
                            }
                        };
                        this.eventCallbackFibers.push(callbackFiber)
                    }
                }
            })
        }
    }

  /**
   * trigger a event.
   * @param {RegExp} nameRegExp - The event name RegExp.
   * @param {Object} info - The event info.
   */
  triggers(nameRegExp, info = {}) {
    for(let key in this.events) {
      if(key.match(nameRegExp) == key) this.trigger(key, info)
    }
  }

    /**
     * change event info.
     * @param name - event name.
     * @param key - event info key.
     * @param value event info value.
     */
    eventInfo(name, key, value) {
        let event = this.events[name];
        if(event) {
            event.info = event.info || {};
            event.info[key] = value
        }
    }

    /**
     * Whether to include the specified event.
     * @param name
     * @returns {boolean}
     */
    have(name) {
        return this.events[name] != void 0
    }

    _on(name, conf, callback, immediately) {
        if(name == 'isEventManagerStop'){
            Error("error:The event(isEventManagerStop) can only have one callback.")
        }
        let event = this.events[name] = this.events[name] ? this.events[name] : new Event(name, conf.info);
        callback.immediately = immediately;
        conf.index == void 0 ? event.push(callback) : event[conf.index] = callback
    }

    /**
     * on a async event callback.
     * @param {String} name - The event name.
     * @param {Object} conf - The event callback conf.
     * @param {EventManager~eventCallback} callback - The event callback.
     * @param {Boolean} immediately
     */
    onAsync(name, conf, callback, immediately = false) {
        callback.async = true;
        this._on(name, conf, callback, immediately)
    }

    /**
     * on a event callback.
     * @param {String} name - The event name.
     * @param {Object} conf - The event callback conf.
     * @param {EventManager~eventCallback} callback - The event callback.
     * @param {Boolean} immediately
     */
    on(name, conf, callback, immediately = false) {
        callback.async = false;
        this._on(name, conf, callback, immediately)
    }
    /**
     * This eventCallback is added a event event.
     * @callback EventManager~eventCallback
     * @param {EventManager} eventManager
     * @param {Object} callback info.
     */

    /**
     * Stop EventManager.
     */
    stop() {
        this.trigger('eventManagerStop');
        this.trigger('isEventManagerStop')
    }

    /**
     * Determines whether the EventManager is stopped.
     */
    isStop() {
        return this.eventCallbackFibers.length == 1 && this.eventCallbackFibers[0].name == 'isEventManagerStop'
    }

    // helper function

    /**
     * kill the designated event callback.
     * @param {String|RegExp} name - The event name. It can be a regexp(exact match).
     */
    killEventCallback(name) {
        if(typeof name == "string") {
            this.eventCallbackFibers.forEach((obj)=>{
                if(obj.name == name) this.eventCallbackFibers.delete(obj)
            })
        } else {
            this.eventCallbackFibers.forEach((obj)=>{
                if(obj.name.match(name) == obj.name) this.eventCallbackFibers.delete(obj)
            })
        }
    }

    /**
     * if the event callback is running, it returns true.
     * @param {String|RegExp} name - The event name. It can be a regexp(exact match).
     * @returns {boolean}
     */
    isEventCallbackRun(name) {
        let back = false;
        if(typeof name == "string") {
            this.eventCallbackFibers.forEach((obj)=>{if(obj.name == name) return back = true})
        } else {
            this.eventCallbackFibers.forEach((obj)=>{if(obj.name.match(name) == obj.name) return back = true})
        }
        return back
    }

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
     * isOk.
     * @param {EventManager~isOkCallback} callback
     */
    isOk(callback) {
        while(true){
            if(callback()) break;
            Fiber.yield()
        }
    }
    /**
     * This isOkCallback is added a event event.
     * @callback EventManager~isOkCallback
     * @return {Boolean} The callback function executes the result.
     */

    /**
     * Helper methods.<br>
     * @param {EventManager~filterCallback} callback
     */
    filter(callback) {
        if(!callback()) Fiber.yield(true)
    }
    /**
     * This filterCallback is added a event event.
     * @callback EventManager~filterCallback
     * @return {Boolean} The callback function executes the result.
     */


    /**
     * Helper methods.<br>
     * @param {Number} value - sec.
     */
    wait(value) {
        if(this.timers[this.self.objectId] == void 0) this.timers[this.self.objectId] = Date.now();
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


export default EventManager