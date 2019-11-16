import React, { useState } from "react";
import { uuid } from "uuidv4";

import { TodoStore, TodoStore2, TodoStore3 } from "../../store/todo.store";
import { observer, useComputed, useLocalStore } from "mobx-react-lite";
import {
  FILTERTYPE,
  filter,
  Filter,
  RichTodo,
  Todo
} from "../../components/helpers";

export const TodoList = observer(() => {
  const store = useLocalStore(() => new TodoStore3());
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const filteredList = useComputed(() => {
    return store.todos.filter(filter(filterType));
  }, [filterType]);
  const [text, updateText] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        store.addTodo({
          text,
          done: false,
          id: uuid()
        });
      }}
    >
      <h2>todomvc mobx local版</h2>
      <input value={text} onChange={e => updateText(e.target.value)}></input>
      <div>
        {filteredList.map(x => (
          <Todo item={x} key={x.id} onClick={() => store.toggle(x.id)} />
        ))}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
});
