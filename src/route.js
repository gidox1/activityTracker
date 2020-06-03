'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./auth');
const UserController = require('./controller/user')

router.get('/', (req, res) => new UserController().run(req, res))
router.post('/', (req, res) => new UserController().run(req, res))

module.exports = router;