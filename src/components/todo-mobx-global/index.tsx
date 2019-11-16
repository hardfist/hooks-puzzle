import React, { useState, useContext } from "react";
import { uuid } from "uuidv4";
import { observer, useComputed } from "mobx-react-lite";
import { storeContext } from "../../store/root";
import { FILTERTYPE, filter, Todo, Filter, RichTodo } from "../../components/helpers";

export const TodoList = observer(() => {
  const { todoStore } = useContext(storeContext);
  const [text, updateText] = useState(""); // 临时ui状态不用放store
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const filteredList = useComputed(() => {
    return todoStore.todos.filter(filter(filterType));
  }, [filterType]);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        todoStore.addTodo({
          text,
          id: uuid(),
          done: false
        });
      }}
    >
      <h2>todomvc mobx global版</h2>
      <input value={text} onChange={e => updateText(e.target.value)}></input>
      <div>
        {filteredList.map(x => (
          <RichTodo item={x} key={x.id} />
        ))}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
});
