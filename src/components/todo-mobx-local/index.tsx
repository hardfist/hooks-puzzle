import React, { useState } from "react";
import { TodoStore } from "../../store/todo.store";
import { useMount, useAsync } from "react-use";
import { observer } from "mobx-react";
import { FILTERTYPE, Filter, RichTodo, filter } from "../../components/helpers";
import { uuid } from "uuidv4";
export const TodoList = observer(() => {
  const [store] = useState(new TodoStore());

  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const filteredTodos = store.filteredTodos(filter(filterType));
  const [text, updateText] = useState("");
  useMount(() => {
    store.fetchTodo();
  });
  const fetchResult = useAsync(store.fetchTodo, []);
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
        {fetchResult.loading && <div>loading ....</div>}
        {!fetchResult.loading &&
          filteredTodos.map(x => <RichTodo item={x} key={x.id} />)}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
});
