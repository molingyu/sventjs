var Svent = require('../../lib/svent.js');

var em = new Svent.EventManger();
em.on('main', {}, function (em, info) {
    console.log('EventManger#on' + info);
});
em.trigger('main', ' happy!');

em.update();

// doc put
// 普通回调。
/*
 EventManger#on happy!
 */