'use strict';

const userService = require('../service/user');
const status_helper = require('../status_helpers')

class User {

    create(req, res) {
        req.body.ipObject = req.ipInfo;
        if(!req.body || !req.body.name || !req.body.phone || !req.body.password || !req.body.email || !req.body.type) {
            const error = {
                status: false,
                mesaage: "Please pass user data"
            }
            return res.send(error).status(400)
        }

        return new userService().create(req.body)
            .then(Response => {
                if(!Response.status) {
                    return res.send(Response).status(400)
                }
                return status_helper.createdResponse(
                    res, {Response}
                )              
            })
            .catch(error => {
                return status_helper.internalServerErrorResponse(
                    res, {error}
                )            
            })
    }


    login(req, res) {
        if(!req.body.email || !req.body.password|| !req.body.type) {
            const error = {
                status: false,
                mesaage: "Please pass user data"
            }
            return res.send(error).status(400)
        }

        return new userService().login(req.body)
            .then(Response => {
                if(!Response.status) {
                    return res.send(Response).status(400)
                }
                return res.send(Response).status(201)
            })
            .catch(error => {
                return status_helper.internalServerErrorResponse(
                    res, {error}
                )                 
            })
    }


    likeProduct(req, res) {
        if(!req.body.product || !req.body.product < 0 || !req.body.type) {
            const error = {
                status: false,
                mesaage: "Bad Request"
            }
            return res.send(error).status(400)
        }
        const email = res.locals.user.payload.email;    
        req.body.email = email;

        return new userService().likeProduct(req.body)
            .then(Response => {
                if(!Response.status) {
                    return res.send(Response).status(400)
                }
                return res.send(Response).status(201)
            })
            .catch(error => {
                return status_helper.internalServerErrorResponse(
                    res, {error}
                )                 
            })
    }



    async addToCart(req, res) {
        if(!req.body.cart || !req.body.product < 0 || !req.body.type) {
            const error = {
                status: false,
                mesaage: "Bad Request"
            }
            return res.send(error).status(400)
        }
        const email = res.locals.user.payload.email;    
        req.body.email = email;

        return new userService().addToCart(req.body)
            .then(Response => {
                if(!Response.status) {
                    return res.send(Response).status(400)
                }
                return res.send(Response).status(201)
            })
            .catch(error => {
                return status_helper.internalServerErrorResponse(
                    res, {error}
                )                 
            })
    }
}

module.exports = User;