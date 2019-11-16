import { observable, computed, action, reaction } from "mobx";
import { uuid } from "uuidv4";

export class TodoModel {
  @observable id: string;
  @observable text: string;
  @observable done: boolean;
  @observable deleted!: boolean;

  constructor(item: string | Item) {
    if (typeof item === "string") {
      this.id = uuid();
      this.text = item;
      this.done = false;
      this.deleted = false;
    } else {
      this.id = item.id;
      this.text = item.text;
      this.done = item.done;
    }
  }
  @action toggleDone() {
    this.done = !this.done;
  }
}

export class TodoStore {
  @observable todos: TodoModel[] = [];
  @action addTodo = (todo: Item) => {
    this.todos.push(new TodoModel(todo));
  };
  @action toggle = (id: string) => {
    this.todos.forEach(x => {
      if (x.id === id) {
        x.toggleDone();
      }
    });
  };
  @action deleteTodo = (id: string) => {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = updatedTodos;
  };
}
