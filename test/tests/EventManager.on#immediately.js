var Svent = require('../../lib/svent.js');

var em = new Svent.EventManager();

em.on('test', {}, ()=>{
    print("EventManager.on#immediately")
}, true);

em.trigger('test');

em.onAsync('async', {}, (em)=>{
    print("EventManager.onAsync#immediately");
    em.delete();
    print("233")
}, true);

em.trigger('async');


// doc put
/*
 EventManager.on#immediately
 EventManager.onAsync#immediately
 */