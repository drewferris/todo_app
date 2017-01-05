import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Todo} from './todo';

@Injectable()
export class TodoDataService {
  private _todoUrl = 'localhost:3000/todo';

  lastId: number = 0;

  todos: Todo[] = [];

  // constructor() { }

  constructor(private _http: Http) { }

  addTodo(todo: Todo): TodoDataService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
      return this;
  }

  updateTodoById(id: number, values: Object ={}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // getAllTodos(): Todo[] {
  //   return this.todos;
  // }

  getAllTodos(): Todo[] {
    return this._http.get(this._todoUrl)
          .map((response: Response) => Todo[] Response.json())
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}
