import { createContext } from "react";
import { TodoStore } from "./todo.store";
class RootStore {
  todoStore: TodoStore;
  constructor() {
    this.todoStore = new TodoStore();
  }
}

export const storeContext = createContext(new RootStore());
