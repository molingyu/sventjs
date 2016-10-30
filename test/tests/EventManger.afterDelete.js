var Svent = require('../../lib/svent.js');

em = new Svent.EventManger();

Svent.run(em, function (em) {
  em.on('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#afterDelete start!');
    em.afterDelete();
    console.log('delete!');
  });

  em.trigger('main')
});

// doc put
/*
 Svent start!
 delete!
 */