var Svent = require('../../lib/svent.js');

var em = new Svent.EventManager();

em.on('test', {}, ()=>{});

print(em.have('test'));
print(em.have('233'));
// doc put
/*
 true
 false
 */