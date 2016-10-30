/**
 * Created by shitake on 16-10-26.
 */
import Fiber from 'fibers'
/**
 * Class EventCallbackFiber.
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
class EventCallbackFiber {
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

export default EventCallbackFiber