var argv = require('./params')
  , channel = argv['channel']
  , subscriber = require('./lib/redis_client')(channel)
  ;

subscriber.on('message', function(channel,message) {
  /* react to something interesting */
});
