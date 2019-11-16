import React, { useState } from "react";
import { uuid } from "uuidv4";

// import { TodoStore, TodoStore2, TodoStore3 } from "../../store/todo.store";
import { TodoStore } from "../../store/todo.store";
import { observer, useComputed, useLocalStore } from "mobx-react-lite";
import {
  FILTERTYPE,
  filter,
  Filter,
  RichTodo,
  Todo
} from "../../components/helpers";

export const TodoList = observer(() => {
  const [store] = useState(new TodoStore());
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);

  const [text, updateText] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        store.addTodo(text);
      }}
    >
      <h2>todomvc mobx local版</h2>
      <input value={text} onChange={e => updateText(e.target.value)}></input>
      <div>
        {store.todos.map(x => (
          <RichTodo item={x} key={x.id} />
        ))}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
});
