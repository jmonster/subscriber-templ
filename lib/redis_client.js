var redis = require('redis')
  , argv  = require('../params')
  ;

module.exports = function init(channel) {
  // create redis client
  var rcli = redis.createClient(argv['redis-port'],argv['redis-host']);

  // authenticate with provided password
  var pw = argv['redis-password'];
  if (pw) {
    rcli.auth(pw,function(err) {
      if (err) { console.log("redis auth error:" + err); }
    })
  }
  
  // log redis ready state
  rcli.on("ready", function(){
    console.log('redis' + ' connected to '
                        + argv['redis-host']
                        + ':'
                        + argv['redis-port']);
  });

  // avoid crashing the server when redis disconnects
  // + log the error to stdout
  rcli.on("error", function(){
    console.error('redis' + ' disconnected from ' + argv['redis-host']);
  });

  // subscribe to `channel`
  rcli.subscribe(channel);

  // log debug info in dev mode
  if (process.env.NODE_ENV !== 'production') {
    rcli.on("subscribe", function(channel,count) {
      console.info('channel:',channel);
      console.info('count:',count);
    });
  }

  return rcli;
};
