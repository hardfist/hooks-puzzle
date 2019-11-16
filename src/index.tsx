import { TodoList as TodoListHook } from "./components/todo-hook";
import { TodoList as TodoListMobx } from "./components/todo-mobx";
import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <div>
      <TodoListMobx />
      <TodoListHook />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
