'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./auth');
const UserController = require('./controller/user')

router.post('/register', (req, res) => new UserController().create(req, res));
router.post('/login', (req, res) => new UserController().login(req, res));
router.post('/product/like-product', new auth().VerifyToken, (req, res) => new UserController().likeProduct(req, res));
router.post('/product/add-to-cart', new auth().VerifyToken, (req, res) => new UserController().addToCart(req, res));

module.exports = router;