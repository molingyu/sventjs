var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#filter(false) start!');
    em.filter(()=>{ return false });
    print('filter(false)!');
  });

  em.trigger('main')
});

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#filter(true) start!');
    em.filter(()=>{ return true });
    print('filter(true)!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManager#filter(false) start!
 EventManager#filter(true) start!
 filter(true)!
 */