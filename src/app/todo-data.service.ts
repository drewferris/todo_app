import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, ResponseOptions } from '@angular/http';

import { Todo}  from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TodoDataService {
  private _todoUrl = 'http://localhost:3000/todo';

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

  getTodos(): Observable<Todo[]> {
    return this._http.get(this._todoUrl)
            .map((response: Response) => <Todo[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
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

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  } 

  private handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
