'use strict';

const Joi = require('joi');
const Handlers = require('./handler');

const Routes = [{
   method: 'POST',
   path: "/api/login",
   options: {
      description: 'Login Into Our Blogs App',
      notes: 'Returns true if username and password is matched and generate a JWT.',
      tags: ['api'],
      validate: {
         payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
         }
      },
      handler: Handlers.login
   }
}, {
   method: 'POST',
   path: "/api/register",
   options: {
      description: 'Signup For Our Blogs App',
      notes: 'Crate User account in our app',
      tags: ['api'],
      validate: {
         payload: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
         }
      },
      handler: Handlers.register
   }
}];

module.exports = Routes;