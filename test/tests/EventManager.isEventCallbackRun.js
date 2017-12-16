var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
    em.on('man', {}, function () {}, true);
    em.on('main', {}, function () {});
    em.onAsync('async', {}, function () {}, true);
    em.trigger('man');
    em.trigger('main');
    em.trigger('async');
    print(em.isEventCallbackRun(/man/));
    print(em.isEventCallbackRun(/main/));
    print(em.isEventCallbackRun(/async/));
    print(em.isEventCallbackRun(/ma.*/));
    Svent.stop();
});

// doc put
/*
 false
 true
 true
 true
 */