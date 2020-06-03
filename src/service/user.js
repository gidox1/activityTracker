'use strict';

const dummyIP = '172.217.167.78';
const shortId = require('shortid');
const faker = require('faker');
const logger = require('turbo-logger').createStream({})
const events = require('events');
const config = require('../config')
const emitter = new events.EventEmitter();
const track_prefix = 'INF-';
const memcached = require('../memcached_client');


/**
 * Function to build user mockdata with Faker
 */
async function buildUserData() {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        geo: {
            ip: dummyIP,
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
            country: faker.address.country(),
            state: faker.address.state(),
        },
        tracking_id: track_prefix + shortId.generate(),
        timestamp : new Date()
    };
    return await userData;
}



/**
 * Function to build Cart Data
 */
async function buildCartData() {
    const rand = config.randomIntFromInterval(1,10);
    const productArray = []

    for (let i = 0; i<rand; i++) {
        const items = {
            name: faker.commerce.productName(),
            quantity: config.randomIntFromInterval(1,50),
            weight: config.randomIntFromInterval(1,10),
            price: faker.commerce.price()       
        }
        productArray.push(items);
    }

    const cart = {
        id : Math.floor(Math.random()*90000) + 10000,
        products: productArray
    }
    return await cart;
}


/**
 * Function to push to Memcached
 * @param {Object} data 
 * @param {String} key 
 */
async function pushToMemcached(data, key) {
    await memcached.set(key, data, 300, function (err) {
        if(err) logger.error(err);
    });

    await memcached.get(key, function (err, data) {
        logger.log("got data ", data, "\n\n")
    });
}



/**
 * Function to register and simulate each event
 */
async function trigger() {
    const eventTypes = ['login', 'register', 'add_to_cart', 'like'];
    const reference = ['creiteo', 'google_ads', 'facebook_ads']
    const randomIndex = config.randomIntFromInterval(0,3);
    let type = eventTypes[randomIndex];
    const referenceChosen = reference[randomIndex]
    type = 'add_to_cart';

    emitter.on('login', async function () {
        const data = await buildUserData();
        data.type = type;
        data.session_id = shortId.generate() + '_' + new Date();
        const key = `${data.type}_${data.tracking_id}${data.type}`;
        logger.log(`Registering event ${data.type}_${data.tracking_id}${data.type}`)
        pushToMemcached(data, key);
    });

    emitter.on('register', async function () {
        const data = await buildUserData();
        data.type = type;
        data.references = referenceChosen;
        const key = `${data.type}_${data.tracking_id}${data.type}`;
        logger.log(`Registering event ${data.type}_${data.tracking_id}${data.type}`)
        pushToMemcached(data, key);
    });


    emitter.on('add_to_cart', async function () {
        const data = await buildUserData();
        data.type = type;
        data.references = referenceChosen;
        const key = `${data.type}_${data.tracking_id}${data.type}`;
        logger.log(`Registering event ${data.type}_${data.tracking_id}${data.type}`)
        data.cart = await buildCartData();
        pushToMemcached(data, key);
    });

    triggerEmitter(type)
}


/**
 * Function to Trigger events
 * @param {String} type 
 */
function triggerEmitter(type) {
    switch(type) {
        case 'login':
            emitter.emit('login', {});
        case 'register':
            emitter.emit('register', {});
        case 'add_to_cart':
            emitter.emit('add_to_cart', {});
        break
    }
}


//Expose trigger method
module.exports = {
    trigger
};