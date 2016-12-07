var Svent = require('../../lib/svent.js');

em = new Svent.EventManger();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#delete start!');
    em.delete();
    console.log('delete!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManger#delete start!
 */