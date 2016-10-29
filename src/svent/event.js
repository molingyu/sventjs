/**
 * Created by shitake on 16-10-26.
 */

export default class Event extends Array {
    constructor(name, genre) {
        super();
        this.name = name;
        this.genre = genre;
    }
}