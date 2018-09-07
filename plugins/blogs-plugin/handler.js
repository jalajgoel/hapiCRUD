 'use strict'
 const blogModel = require('../../models/blogModel');


 async function allBlogs(request, h) {
    try {
       var blogs = await blogModel.find({})
    } catch (err) {
       return h.response({
          "Error": err.message
       }).code(500);
    }
    if (blogs) {
       return h.response({
          "status": true,
          "message": "All Blogs",
          blogs
       }).code(200);
    } else {
       return h.response({
          "message": "No Data Found"
       }).code(200);
    }
 }
 async function addBlogs(request, h) {

    try {
       const newblog = new blogModel(request.payload);
       var data = await newblog.save()
    } catch (err) {
       return h.response({
          "status": false,
          "Error": err.message
       }).code(500);
    }
    if (data) {
       return h.response({
          "status": true,
          "message": "Blog Created Successfuly.",
          data
       }).code(201);
    } else {
       return h.response({
          "status": false,
          "message": "No Data Found"
       }).code(200);
    }

 }
 async function singleBlog(request, h) {

    try {
       var _id = request.params.id;
       var blog = await blogModel.findById({
          _id
       });
    } catch (err) {
       return h.response({
          "status": false,
          "Error": err.message
       }).code(500);
    }

    if (blog) {
       return h.response({
          "status": true,
          "message": `Blog Data with id ${_id}`,
          blog
       }).code(200);
    } else {
       return h.response({
          "status": false,
          "message": "No Data Found"
       }).code(200);
    }


 }
 async function updateBlog(request, h) {

    try {
       var newdata = request.payload;
       var _id = request.params.id;
       var blog = await blogModel.findByIdAndUpdate({
             _id
          },
          newdata, {
             new: true
          });
    } catch (err) {
       return h.response({
          "status": false,
          "Error": err.message
       }).code(500);
    }
    if (blog) {
       return h.response({
          "status": true,
          "message": "Blog Updated Successfuly.",
          blog
       }).code(200);
    } else {
       return h.response({
          "status": false,
          "message": "No Data Found"
       }).code(200);
    }

 }
 async function deleteBlog(request, h) {

    try {
       var _id = request.params.id;
       var blog = await blogModel.findByIdAndRemove({
          _id
       });
    } catch (err) {
       return h.response({
          "Error": err.message
       }).code(500);
    }
    if (blog) {
       return h.response({
          "status": true,
          "message": "Blog Deleted Successfuly.",
          blog
       }).code(200);
    } else {
       return h.response({
          "status": false,
          "message": "No Data Found"
       }).code(200);
    }
 }


 module.exports = {
    allBlogs,
    addBlogs,
    singleBlog,
    updateBlog,
    deleteBlog
 };