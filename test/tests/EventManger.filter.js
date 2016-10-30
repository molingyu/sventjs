var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.on('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#filter(false) start!');
    em.filter(()=>{ return false });
    console.log('filter(false)!');
  });

  em.trigger('main')
});

Svent.run(null, function (em) {
  em.on('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#filter(true) start!');
    em.filter(()=>{ return true });
    console.log('filter(true)!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManger#filter(false) start!
 EventManger#filter(true) start!
 filter(true)!
 */