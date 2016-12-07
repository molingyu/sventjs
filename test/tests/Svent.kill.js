var Svent = require('../../lib/svent.js');

em = new Svent.EventManger();

Svent.run(em, function (em) {
  em.onAsync('main', {}, function (em) {
    console.log('Svent#kill start!');
    Svent.kill();
    em.trigger('message', "Kill Svent!");
    console.log('kill!');
  });

  em.onAsync('message', {}, (_, data)=>{
    console.log(data)
  });

  em.trigger('main')
});

// doc put
/*
 Svent#kill start!
 kill!
 */