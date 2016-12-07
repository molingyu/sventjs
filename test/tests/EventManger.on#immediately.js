var Svent = require('../../lib/svent.js');

var em = new Svent.EventManger();

em.on('test', {}, ()=>{
    console.log("EventManger.on#immediately")
}, true);

em.trigger('test');

em.onAsync('async', {}, (em)=>{
    console.log("EventManger.onAsync#immediately");
    em.delete();
    console.log("233")
}, true);

em.trigger('async');


// doc put
/*
 EventManger.on#immediately
 EventManger.onAsync#immediately
 */