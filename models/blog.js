const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

// name of model should be the singular version of the MongoDB colection name
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog