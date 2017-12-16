var Svent = require('../../lib/svent.js');

em = new Svent.EventManager();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#afterDelete start!');
    em.afterDelete();
    print('delete!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManager#afterDelete start!
 delete!
 */