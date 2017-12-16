var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    print('EventManager#times start!');
    em.times(2);
    print('2 times!');
    Svent.kill();
  });

  em.trigger('main');
  em.trigger('main')
});

// doc put
// 每隔两次产生一次有效调用。
/*
 EventManager#times start!
 EventManager#times start!
 2 times!
 */