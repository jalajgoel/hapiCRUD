'use strict';
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function login(req, h) {
   try {
      var user = req.payload;
      var data = await userModel.findOne({
         "email": user.email
      });
   } catch (err) {
      return h.response({
         "error": err.message
      }).code(500);
   }
   if (data) {

      var verify_pass = await bcrypt.compare(user.password, data.password);

      if (verify_pass === true) {
         var jwt_payload = {
            email: data.email,
            id: data._id
         }
         var token = jwt.sign(jwt_payload, 'secret_key');
         return h.response({
            "success": true,
            "message": "Authentication successfull",
            token
         }).code(200);
      } else {
         return h.response({
            "message": "Unauthorised"
         }).code(401);
      }
   } else {
      return h.response({
         "message": "No data Found"
      }).code(200);
   }
}

async function register(req, h) {

   try {

      var name = req.payload.name,
         password = req.payload.password,
         email = req.payload.email;

      var salt = await bcrypt.genSalt(10);

      var hashed = await bcrypt.hash(password, salt);

      var user = new userModel({
         name,
         password: hashed,
         email
      });

      var data = await user.save();

   } catch (err) {
      return h.response({
         "error": err.message
      }).code(500);
   }
   if (data) {
      return h.response({
         data
      }).code(201);
   } else {
      return h.response({
         "message": "No data Found"
      }).code(200);
   }

}

module.exports = {
   login,
   register
};