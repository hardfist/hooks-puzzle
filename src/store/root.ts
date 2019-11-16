import { createContext } from "react";
import { TodoStore } from "../components/todo-mobx-global/todo.store";

class RootStore {
  todoStore: TodoStore;
  constructor() {
    this.todoStore = new TodoStore();
  }
}

export const storeContext = createContext(new RootStore());
