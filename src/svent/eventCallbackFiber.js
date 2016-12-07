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
        this.alive = true;
        let self = this;
        this.fiber = new Fiber(()=>{
            self.callback(em, self.info);
            self.fiber = null;
            this.alive = false
        });
        if(callback.immediately) this.next()
    }

    next() {
        if(!this.fiber){
            return console.error(`Fiber(${this.name}) is not alive!`)
        }
        if(this.return) {
            this.fiber = null;
            this.alive = false
        } else {
            this.return = this.fiber.run()
        }
    }
}

export default EventCallbackFiber