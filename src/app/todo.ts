export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;
  name: string;
  description: string;
  added: number;
  goal: number;
  level: number;
  completed: boolean; 

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


