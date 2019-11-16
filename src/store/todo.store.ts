import { observable } from "mobx";
import { uuid } from "uuidv4";
import { computedFn } from "mobx-utils";
import { fetchList } from "../service/todo";

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
  toggleDone() {
    this.done = !this.done;
  }
}

export class TodoStore {
  @observable todos: TodoModel[] = [];
  addTodo = (todo: Item) => {
    this.todos.push(new TodoModel(todo));
  };
  toggle = (id: string) => {
    this.todos.forEach(x => {
      if (x.id === id) {
        x.toggleDone();
      }
    });
  };
  async fetchTodo() {
    const result = await fetchList();
    result.forEach(x => {
      this.todos.push(new TodoModel(x));
    });
    return result;
  }
  filteredTodos = computedFn(function(
    this: TodoStore,
    pred: (x: TodoModel) => boolean
  ) {
    return this.todos.filter(x => pred(x));
  });
  deleteTodo = (id: string) => {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = updatedTodos;
  };
}
