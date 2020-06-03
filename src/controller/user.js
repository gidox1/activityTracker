'use strict';

const userService = require('../service/user');
const status_helper = require('../status_helpers')

class User {

    run(req, res) {
        return userService.trigger();
    }
}

module.exports = User;