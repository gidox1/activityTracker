const Memcached = require('memcached');
Memcached.config.poolSize = 25;
const memcached = new Memcached();


memcached.connect( 'localhost:11211', function( err, conn ){
    if( err ) {
    console.log( conn.server,'error while memcached connection!!');
    }
});


module.exports = memcached