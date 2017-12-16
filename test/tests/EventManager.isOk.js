var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.onAsync('main', {}, function (em) {
    Svent.stop();
    print('EventManager#filter(true) start!');
    em.isOk(()=>{
      return true
    });
    print('filter(true)!');
  });

  em.trigger('main')
});

// doc put
// 更好例子，请浏览Svent#stop的实现。
/*
 EventManager#filter(true) start!
 filter(true)!
 */