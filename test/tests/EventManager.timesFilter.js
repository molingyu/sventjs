var EventManager = require('../../lib/svent.js').EventManager;

var em = new EventManager();

var isStop = false;

em.onAsync('main', {}, function (em) {
  print('EventManager#waitFilter start!');
  em.timesFilter(5);
  print('timesFilter 10');
  em.times(2);
  isStop = true
});

em.trigger('main');

while( !isStop ) {
  em.trigger('main');
  em.update()
}

// doc put
// 5次 trigger 产生一次有效消费
/*
 EventManager#waitFilter start!
 timesFilter 10
 EventManager#waitFilter start!
 EventManager#waitFilter start!
 EventManager#waitFilter start!
 EventManager#waitFilter start!
 EventManager#waitFilter start!
 timesFilter 10
 */