var Svent = require('../../lib/svent.js');

Svent.run(null, function (em) {
    em.on('man', {}, function () {}, true);
    em.on('main', {}, function () {});
    em.onAsync('async', {}, function () {}, true);
    em.trigger('man');
    em.trigger('main');
    em.trigger('async');
    console.log(em.isEventCallbackRun(/man/));
    console.log(em.isEventCallbackRun(/main/));
    console.log(em.isEventCallbackRun(/async/));
    console.log(em.isEventCallbackRun(/ma.*/));
    Svent.stop();
});

// doc put
/*
 false
 true
 true
 true
 */