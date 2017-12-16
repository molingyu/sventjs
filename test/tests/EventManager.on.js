var Svent = require('../../lib/svent.js');

var em = new Svent.EventManager();
em.on('main', {}, function (em, info) {
    print('EventManager#on' + info);
});
em.trigger('main', ' happy!');

em.update();

// doc put
// 普通回调。
/*
 EventManager#on happy!
 */