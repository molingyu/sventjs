var Svent = require('../../lib/svent.js');

em = new Svent.EventManager();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    print('Svent#stop start!');
    em.trigger('stop', "Stop Svent!");
    print('stop!');
  });

  em.onAsync('stop', {}, (_, data)=>{
    Svent.stop();
    print(data)
  });

  em.trigger('main')
});

// doc put
/*
 Svent#stop start!
 stop!
 Stop Svent!
 */