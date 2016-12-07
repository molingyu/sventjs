var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
    em.onAsync('main', {}, function (em) {
        console.log('EventManger#killEventCallback start!');
        em.killEventCallback(/main/);
        em.wait(2);
        console.log('2 sec!');
    });

    em.trigger('main');

    Svent.stop()
});

// doc put
/*
 EventManger#killEventCallback start!
 */