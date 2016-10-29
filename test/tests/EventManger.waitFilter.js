var EventManger = require('../../lib/svent.js').EventManger;

var em = new EventManger();

var isStop = false;

console.log('EventManger#waitFilter start!');

em.on('main', {}, function (em) {
  em.waitFilter(1);
  console.log('waitFilter 1 sec!');
  em.times(3);
  isStop = true
});

var time = Date.now();
em.trigger('main');

while( !isStop ) {
  if(Date.now() - time > 100) em.trigger('main');
  em.update()
}

// out put
// 打印五次，每次间隔一秒
/*
 EventManger#waitFilter start!
 waitFilter 1 sec!
 waitFilter 1 sec!
 waitFilter 1 sec!
 waitFilter 1 sec!
 waitFilter 1 sec!
 */