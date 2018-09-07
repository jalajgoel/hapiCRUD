 'use strict';

 const userModel = require('../models/userModel');

 const validate = async function(decoded, request) {

    var data = await userModel.findById({
       _id: decoded.id
    });
    // do your checks to see if the person is valid
    if (!data) {
       return {
          isValid: false
       };
    } else {
       return {
          isValid: true
       };
    }
 };

 function register(server, options) {

    server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
       key: 'secret_key', // Never Share your secret key
       validate: validate, // validate function defined above
    });

    server.log('info', 'Plugin registered: auth Plugin')
 }

 exports.plugin = {
    name: 'auth-plugin',
    version: '1.0.0',
    register
 }