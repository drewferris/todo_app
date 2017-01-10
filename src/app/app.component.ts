import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [TodoDataService]
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

  // deleteTodo(todo) {
  //   this.todoDataService.deleteTodo(todo)
  //                       .subscribe(
  //                         todos => this.todos = todos,
  //                         error => this.errorMessage = <any>error);                        

  // }

  deleteTodo(todo: Todo): void {
  this.todoDataService
      .deleteTodo(todo)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t !== todo);
        // if (this.selectedTodo === todo) { this.selectedTodo = null; }
      });
}


  
}
