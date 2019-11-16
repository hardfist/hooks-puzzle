import { TodoList as TodoListHook } from "./components/todo-hook";
import { TodoList as TodoListLocal } from "./components/todo-mobx-local";
import { TodoList as TodoListGlobal } from "./components/todo-mobx-global";
import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <div>
      <TodoListGlobal />
      <TodoListLocal />
      <TodoListHook />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
