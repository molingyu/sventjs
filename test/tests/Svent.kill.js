var Svent = require('../../lib/svent.js');

em = new Svent.EventManager();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    print('Svent#kill start!');
    Svent.kill();
    em.trigger('message', "Kill Svent!");
    print('kill!');
  });

  em.onAsync('message', {}, (_, data)=>{
    print(data)
  });

  em.trigger('main')
});

// doc put
/*
 Svent#kill start!
 kill!
 */