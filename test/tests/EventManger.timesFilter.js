var EventManger = require('../../lib/svent.js').EventManger;

var em = new EventManger();

var isStop = false;

em.on('main', {}, function (em) {
  console.log('EventManger#waitFilter start!');
  em.timesFilter(5);
  console.log('timesFilter 10');
  em.times(2);
  isStop = true
});

em.trigger('main');

while( !isStop ) {
  em.trigger('main');
  em.update()
}

// out put
// 5次 trigger 产生一次有效消费
/*
 EventManger#waitFilter start!
 timesFilter 10
 EventManger#waitFilter start!
 EventManger#waitFilter start!
 EventManger#waitFilter start!
 EventManger#waitFilter start!
 EventManger#waitFilter start!
 timesFilter 10
 */