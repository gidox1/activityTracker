'use strict';

const axios = require('axios');
const json_server_url = 'http://localhost:3000/user';
const json_server_url_activities = 'http://localhost:3000/activites'
const auth = require('../auth');
const nodeGeocoder = require('node-geocoder');
const dummyIP = '172.217.167.78';
const options = {
    provider: 'openstreetmap'
};
const geoCoder = nodeGeocoder(options);
const shortId = require('shortid');


class User {

    async create(userData) {
        const ipString = userData.ipObject.ip.split('')
        const name = userData.name.toLowerCase()
        const hashedPassword = await new auth().hashPassword(userData.password);
        userData.password = hashedPassword;
        const location = await geoCoder.geocode(`${userData.city} ${userData.country}`)
        userData.name = name;
        const geoDetails = {
            ip: userData.ipObject.ip,
            latitude: location[0].latitude || 0,
            longitude: location[0].longitude || 0,
            city: userData.city,
            country: userData.country
        }
        
        delete userData.ipObject;

        if(ipString.length < 5) {
            geoDetails.ip = dummyIP;
        }

        userData.geo = geoDetails;

        return axios.get(json_server_url+`?email=${userData.email}`) 
                .then(async res => {
                    console.log(res.data, res.data.length)
                    if(res.data.length > 0) {
                        return {
                            status: false,
                            message: "user already exists"
                        }
                    }

                    const user = {
                        user_details : userData,
                        type: userData.type,
                        email: userData.email
                    }
                    const tracker = await this.registerActivity(user)

                    return axios.post(json_server_url, userData)
                        .then(Response => {
                            console.log(Response)
                            return {
                                status: true,
                                message: 'user successfully created'
                            }
                        })
                        .catch(err => {
                            console.log(err, "REIERIHIR")
                        })
                })
                .catch(err => {
                    console.log("AX ERR", err)
                })


    }



    async login(userData) {
        const {email, password} = userData;
        const userObject = await axios.get(json_server_url+`?email=${userData.email}`) || 0
        const hashedPassword = userObject.data[0].password || 0;
        const compare = await new auth().comparePassword(userData.password, hashedPassword);
        const checkParams = {email: userObject.data[0].email, password: userObject.data[0].password};
        const userParams = {email, password};


        if(!compare) {
            return {
                status: false,
                message: "Invalid email or password"
            }
        }

        const user = {
            user_details :  userObject.data[0],
            type: userData.type,
            email: userParams.email
        }
        const tracker = await this.registerActivity(user)        
        const userToken = await new auth().getToken(userParams, checkParams, userObject.data[0]);
        return {
            status: true,
            message: 'successfully logged in',
            token: userToken
        }
    }


    async likeProduct(data) {
      return this.registerActivity(data)
    }


    async addToCart(data) {
        return this.registerActivity(data)
    }



    async registerActivity(data) {
        console.log(data, "DATYA IMMNNNN")
        const track_prefix = 'INF-';
        const tracking_id = track_prefix + shortId.generate();
        const type = data.type;
        const productDetails = data.product || 0;
        const user_email = data.email;
        console.log(user_email)
        const userObject = await axios.get(json_server_url+`?email=${user_email}`) || {}
        const timestamp = new Date();
        
        console.log("GOT", userObject.hasOwnProperty('data'), userObject)

        if(userObject.hasOwnProperty('data') && userObject.data[0] > 0) {
            delete userObject.data[0].password;
        }  

        console.log("GOT", userObject.hasOwnProperty('data'))


        console.log("HERERERE")
        const responseData = {
            type: type,
            user_data: userObject.data[0],
            tracking_id,
            timestamp: timestamp,
            product: productDetails
        }

        if(data.type == 'add_to_cart') {
            const cartDetails = data.cart;
            responseData.cart = cartDetails;
            responseData.cart.items = productDetails.length
        }
        else if(data.type == 'register' || data.type == 'login') {
            delete responseData.product
            responseData.user_data = data.user_details
        }
        else {
            return {
                status: false,
                message: 'Invalid activity'
            }    
        }

        return axios.post(json_server_url_activities, responseData)
                .then(() => {
                    return {
                        status: true,
                        message: 'Activity successfully registered'
                    }                
                })
                .catch(err => {
                    return {
                        status: false,
                        message: 'Error. Activity could not be registered'
                    }                    
                })
    }



} 

module.exports = User;