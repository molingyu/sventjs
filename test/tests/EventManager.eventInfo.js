var Svent = require('../../lib/svent.js');

var em = new Svent.EventManager();

em.on('test', {info:{test: 110}}, ()=>{});

print(em.events['test'].info.test);

em.eventInfo('test', 'test', 233);

print(em.events['test'].info.test);

// doc put
/*
 110
 233
 */