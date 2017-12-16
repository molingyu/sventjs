var Svent = require('../../lib/svent.js');

em = new Svent.EventManager();
var index = 0;

Svent.run(em, function (em) {
  em.on('aa', {}, function () { index += 1 });
  em.on('12', {}, function () { index += 1 });

  em.triggers(/[a-z]*/);

  Svent.stop()
});
print(index);

// doc put
/*
 1
 */