const Hapi = require('hapi');
const Pack = require('./package');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const server = new Hapi.Server({
   host: "localhost",
   port: 4000,
   routes: {
      "cors": true
   }
});

const db = require('./database').db;

const swaggerOptions = {
   info: {
      title: 'Test API Documentation',
      version: Pack.version,
   },
};

async function start() {

   await server.register([
      Inert,
      Vision, {
         plugin: HapiSwagger,
         options: swaggerOptions
      }, {
         plugin: require('./plugins/blogs-plugin')
      }, {
         plugin: require('./plugins/user-plugin')
      },
   ]);

   // start your server 
   try {
      await server.start()
      console.log(`Server started → ${server.info.uri}`)
   } catch (err) {
      console.error(err)
      process.exit(1)
   }

};

start();