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
export class TodoStore3 {
  @observable todos = [
    { id: "1", text: "todo 1", done: true },
    { id: "2", text: "todo 2", done: false },
    { id: "3", text: "todo 3", done: false }
  ];
  @action addTodo(todo: Item) {
    this.todos.push(todo);
  }
  @action toggle(id: string) {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    this.todos = updatedTodos;
  }
}
export const TodoStore2 = {
  todos: [
    { id: "1", text: "todo 1", done: true },
    { id: "2", text: "todo 2", done: false },
    { id: "3", text: "todo 3", done: false }
  ],
  addTodo(todo: Item) {
    this.todos.push(todo);
  },
  deleteTodo(id: string) {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = updatedTodos;
  },
  toggle(id: string) {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    this.todos = updatedTodos;
  }
};
