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

router.put('/', bodyParser, (req, res, next) => {
  Todo.findOneAndUpdate({_id: req.body._id}, req.body, (err) => {
    if(err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Todo.findOneAndRemove({_id}, (err) => {
    if(err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

