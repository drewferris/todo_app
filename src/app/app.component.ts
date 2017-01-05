import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService],
  styles: ['.error {color: red;}']
})
export class AppComponent implements OnInit {
  
  errorMessage: string;
  todos: Todo[];
  mode = 'Observable';

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit() { this.getTodos(); }

  getTodos() {
    this.todoDataService.getTodos()
                          .subscribe(
                            todos => this.todos = todos,
                            error => this.errorMessage = <any>error);
                          
  }

  
}
