import { observable, computed, action } from "mobx";

export class TodoStore {
  @observable todos = [
    { id: "1", text: "todo 1", done: true },
    { id: "2", text: "todo 2", done: false },
    { id: "3", text: "todo 3", done: false }
  ];

  @action addTodo = (todo: Item) => {
    this.todos.push(todo);
  };

  @action deleteTodo = (id: string) => {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = updatedTodos;
  };
  @action toggledone = (id: string) => {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    this.todos = updatedTodos;
  };
}
