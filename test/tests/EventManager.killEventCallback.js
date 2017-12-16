var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
    em.onAsync('main', {}, function (em) {
        print('EventManager#killEventCallback start!');
        em.killEventCallback(/main/);
        em.wait(2);
        print('2 sec!');
    });

    em.trigger('main');

    Svent.stop()
});

// doc put
/*
 EventManager#killEventCallback start!
 */