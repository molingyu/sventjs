var Svent = require('../../lib/svent.js');

em = new Svent.EventManger();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    console.log('Svent#stop start!');
    em.trigger('stop', "Stop Svent!");
    console.log('stop!');
  });

  em.onAsync('stop', {}, (_, data)=>{
    Svent.stop();
    console.log(data)
  });

  em.trigger('main')
});

// doc put
/*
 Svent#stop start!
 stop!
 Stop Svent!
 */