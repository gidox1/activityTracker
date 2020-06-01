var Memcached = require('memcache');
Memcached.config.poolSize = 25;

var memcached = new Memcached('localhost:9000', {retries:10,retry:10000,remove:true});

// var Client = memjs.Client.create('localhost:9000', {
//   username: 'test_user',
//   password: 'dummy_password2005'
// }); 

memcached.set('foo', 'bar', 1200, function (err) { 
    console.log(err)
 });

console.log("MEM")
memcached.get('foo',(err, value, key) => {
    console.log("INSIDE")
    if (value != null) {
        console.log(value.toString());
    }
});

module.exports = memcached