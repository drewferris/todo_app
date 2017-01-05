'use strict';

const express = require('express');
const Todo = require('../model/todo');
const bodyParser = require('body-parser').json();

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if(err) return next(err);
        res.json(todos);
    });
});

router.get('/:id', (req, res, next) => {
    let _id = req.params.id;
    Todo.findOne({_id}, (err, todo) => {
        if(err) return next(err);
        res.json({todo});
    });
});

router.post('/', bodyParser, (req, res, next) => {
    let newTodo = new Todo(req.body);
    newTodo.save((err, data) => {
        if(err) return next(err);
        res.json(data);
    });
});