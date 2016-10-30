/**
 * Created by shitake on 16-10-26.
 */

/**
 * Class Event.
 * @extends Array
 * @author shitake <z1522716486@hotmail.com>
 * @license MIT <https://mit-license.org/>
 */
class Event extends Array {
    constructor(name, genre) {
        super();
        this.name = name;
        this.genre = genre;
    }
}

export default Event