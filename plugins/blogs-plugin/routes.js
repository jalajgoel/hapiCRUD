'use strict'

const Handlers = require('./handler');
const Joi = require('joi');

const Routes = [{
   method: 'GET',
   path: '/api/blogs',
   options: {
      description: 'Get blogs',
      notes: 'Returns a list of all blogs.',
      tags: ['api'],
      handler: Handlers.allBlogs,
   }
}, {
   method: 'POST',
   path: '/api/blogs',
   options: {
      auth: 'jwt',
      description: 'Add blogs',
      notes: 'Returns a blog which is added.',
      tags: ['api'],
      validate: {
         payload: {
            title: Joi.string().required(),
            description: Joi.string().required()
         }
      },
      handler: Handlers.addBlogs
   }
}, {
   method: 'GET',
   path: '/api/blogs/{id}',
   options: {
      description: 'Get Single blogs',
      notes: 'Returns a Single block By id.',
      tags: ['api'],
      validate: {
         params: {
            id: Joi.string().required()
         }
      },
      handler: Handlers.singleBlog,
   }
}, {
   method: 'PUT',
   path: '/api/blogs/{id}',
   options: {
      auth: 'jwt',
      description: 'Update blogs',
      notes: 'Returns a updated blog.',
      tags: ['api'],
      validate: {
         payload: {
            title: Joi.string(),
            description: Joi.string()
         },
         params: {
            id: Joi.string().required()
         }
      },
      handler: Handlers.updateBlog,
   }
}, {
   method: 'DELETE',
   path: '/api/blogs/{id}',
   options: {
      auth: 'jwt',
      description: 'Delete blogs',
      notes: 'Returns a deleteBlog By id ',
      tags: ['api'],
      validate: {
         params: {
            id: Joi.string().required()
         }
      },
      handler: Handlers.deleteBlog,
   }
}];

module.exports = Routes;