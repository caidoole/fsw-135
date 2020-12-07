const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    description: String, 
});

module.exports = mongoose.model('Commnets', CommentSchema)