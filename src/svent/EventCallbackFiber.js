/**
 * Created by shitake on 16-10-26.
 */
import Fiber from 'fibers'

export default class EventCallbackFiber {
    constructor(em, name, callback, info) {
        this.objectId = Date.now().toString();
        this.name = name;
        this.info = info;
        this.callback = callback;
        let self = this;
        this.fiber = new Fiber(()=>{
            self.callback(em, self.info);
            self.fiber = null
        })
    }

    next() {
        if(!this.fiber){
            return console.error(`Fiber(${this.name}) is not alive!`)
        }
        if(this.return) {
            this.fiber = null
        } else {
            this.return = this.fiber.run()
        }
    }

    isAlive() {
        return this.fiber != null
    }


}