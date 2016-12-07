var Svent = require('../../lib/svent.js');

var em = new Svent.EventManger();

em.on('test', {info:{test: 110}}, ()=>{});

console.log(em.events['test'].info.test);

em.eventInfo('test', 'test', 233);

console.log(em.events['test'].info.test);

// doc put
/*
 110
 233
 */