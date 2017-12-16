var Svent = require('../../lib/svent.js');

em = new Svent.EventManager();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#delete start!');
    em.delete();
    print('delete!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManager#delete start!
 */