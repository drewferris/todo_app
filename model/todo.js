'use strict';

const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    _id: {type: Number},
    name: {type: String},
    description: {type: String},
    added: {type: String},
    goal: {type: String},
    level: {type: Number},
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('todo', Todo);