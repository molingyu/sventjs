var Svent = require('../../lib/svent.js');

var em = new Svent.EventManger();

em.on('test', {}, ()=>{});

console.log(em.have('test'), em.have('233'));

// doc put
/*
 true false
 */