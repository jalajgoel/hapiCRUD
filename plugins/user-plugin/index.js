'use strict'

const Routes = require("./routes");

function register(server, options) {

   server.route(Routes);
   server.log('info', 'Plugin registered: User Plugin')
};

module.exports = {
   name: "user-plugin",
   version: "1.0.0",
   register
}