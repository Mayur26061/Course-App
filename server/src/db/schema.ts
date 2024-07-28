/* eslint-disable no-undef */
import mongoose from "mongoose";
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
export const User = mongoose.model('User', users)
export const Admin = mongoose.model('Admin', admins)
export const Course = mongoose.model('Course', courses)
export const Content = mongoose.model('Content', content)
