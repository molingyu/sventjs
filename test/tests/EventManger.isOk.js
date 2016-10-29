var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
  em.on('main', {}, function (em) {
    Svent.stop();
    console.log('EventManger#filter(true) start!');
    em.isOk(()=>{
      return true
    });
    console.log('filter(true)!');
  });

  em.trigger('main')
});

// out put
// 更好例子，请浏览Svent#stop的实现。
/*
 EventManger#filter(true) start!
 filter(true)!

 */