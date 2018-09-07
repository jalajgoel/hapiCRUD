'use strict';

const Routes = require('./routes')

function register(server, options) {


   server.register(require('../../authentication'));

   server.route(Routes);
   server.log('info', 'Plugin registered: blog Plugin')
}

exports.plugin = {
   name: 'blog-plugin',
   version: '1.0.0',
   register
}