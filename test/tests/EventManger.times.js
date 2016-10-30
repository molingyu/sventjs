var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.on('main', {}, function (em) {
    console.log('EventManger#times start!');
    em.times(2);
    console.log('2 times!');
    Svent.kill();
  });

  em.trigger('main');
  em.trigger('main')
});

// doc put
// 每隔两次产生一次有效调用。
/*
 EventManger#wait start!
 EventManger#wait start!
 2 times!
 */