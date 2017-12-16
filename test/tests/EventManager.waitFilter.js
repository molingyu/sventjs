var EventManager = require('../../lib/svent.js').EventManager;

var em = new EventManager();

var isStop = false;

print('EventManager#waitFilter start!');

em.onAsync('main', {}, function (em) {
  em.waitFilter(1);
  print('waitFilter 1 sec!');
  em.times(3);
  isStop = true
});

var time = Date.now();
em.trigger('main');

while( !isStop ) {
  if(Date.now() - time > 100) em.trigger('main');
  em.update()
}

// doc put
// 打印3次，每次间隔一秒
/*
 EventManager#waitFilter start!
 waitFilter 1 sec!
 waitFilter 1 sec!
 waitFilter 1 sec!
 */