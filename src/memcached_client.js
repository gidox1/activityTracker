var Memcached = require('memcache');
Memcached.config.poolSize = 25;

var memcached = new Memcached('localhost:9000', {retries:10,retry:10000,remove:true});

memcached.set('foo', 'bar', 1200, function (err) { 
    console.log(err)
});

memcached.get('foo',(err, value, key) => {
    if (value != null) {
        console.log(value.toString());
    }
});

module.exports = memcached