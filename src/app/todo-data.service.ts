import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, ResponseOptions, RequestOptions } from '@angular/http';

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

  constructor(private _http: Http) { }

  getTodos(): Observable<Todo[]> {
    return this._http.get(this._todoUrl)
            .map((response: Response) => <Todo[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
  }

  deleteTodo(todo) {
    return this._http.delete(this._todoUrl + '/' + todo._id)
            .map((response: Response) => <Todo[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
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
