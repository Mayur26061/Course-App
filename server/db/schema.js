/* eslint-disable no-undef */
const mongoose = require("mongoose");
const users = new mongoose.Schema({
    username: String,
    password: String,
    purchaseCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})
const admins = new mongoose.Schema({
    username: String,
    password: String,
})
const courses = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content', unique: true }],
})
const content = new mongoose.Schema({
    title: String,
    description:String,
    type: String,
    url: String,
    published: Boolean,
    courses: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }

})
const User = mongoose.model('User', users)
const Admin = mongoose.model('Admin', admins)
const Course = mongoose.model('Course', courses)
const Content = mongoose.model('Content', content)

module.exports = { User, Admin, Course, Content }
