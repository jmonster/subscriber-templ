var optimist = require('optimist')

.usage('Usage : $0 --channel [channel]')

.describe ('redis-host', 'hostname of redis server')
.default  ('redis-host', '127.0.0.1')

.describe ('redis-port', 'port of redis server')
.default  ('redis-port', '6379')

.describe ('redis-password', 'password for redis server')
.default  ('redis-password', null)

.describe ('redis-db', 'database to select on redis server (0-9)')
.default  ('redis-db', 1)

.describe ('channel', 'the channel to subscribe to')
.alias    ('channel', 'c')
.default  ('channel', 'UNSPECIFIED')

.describe ('help', 'these usage instructions')
.alias    ('help', 'h')

;

var argv = module.exports = optimist.argv;

if (argv.help) {
  optimist.showHelp();
  process.exit(0);
}
