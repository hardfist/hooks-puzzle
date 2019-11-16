import { uuid } from "uuidv4";
import { observable } from "mobx";

export class Todo {
  id: string;
  @observable text: string;
  @observable done: boolean;
  @observable deleted: boolean;

  constructor(text: string) {
    this.id = uuid();
    this.text = text;
    this.deleted = false;
    this.done = false;
  }
  toggleDone() {
    this.done = !this.done;
  }
  remove() {
    this.deleted = true;
  }
}

export class TodoStore {
  @observable todos: Todo[] = [];
  addTodo = (text: string) => {
    const todo = new Todo(text);
    this.todos.push(todo);
    return todo;
  };
}
