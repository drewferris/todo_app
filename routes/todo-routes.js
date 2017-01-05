'use strict';

const express = require('express');
const Todo = require('../model/todo');
const bodyParser = require('body-parser').json();

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if(err) return next(err);
        res.json(bottles);
    });
});