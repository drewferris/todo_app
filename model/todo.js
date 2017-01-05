'use strict';

const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    added: {type: Number},
    goal: {type: Number},
    level: {type: Number},
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('todo', Todo);