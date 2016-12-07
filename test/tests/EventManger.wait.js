var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#wait start!');
    em.wait(1);
    console.log('wait 1 sec!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManger#wait start!
 wait 1 sec!
 */