var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#wait start!');
    em.wait(1);
    print('wait 1 sec!');
  });

  em.trigger('main')
});

// doc put
/*
 EventManager#wait start!
 wait 1 sec!
 */