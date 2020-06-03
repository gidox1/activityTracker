
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = {
    auth_key: 'secret_auth_key',
    valid_types: [
        'like',
        'register',
        'login',
        'add_to_cart'
    ],
    randomIntFromInterval
}