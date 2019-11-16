import React, { useState, useMemo } from "react";
import { useImmer } from "use-immer";
import { useAsync } from "react-use";
import { fetchList } from "../../service/todo";
import { uuid } from "uuidv4";
import { FILTERTYPE, filter, Filter, Todo } from "../../components/helpers";

export const TodoList = ({ initialTodos = [] }: { initialTodos?: Item[] }) => {
  const [todoList, updateTodoList] = useImmer(initialTodos);
  const [text, updateText] = useState("");
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const { loading } = useAsync(async () => {
    // handle ssr prefetch data
    if (todoList.length === 0) {
      const result = await fetchList();
      updateTodoList(() => result);
    }
  }, []);
  const filterdList = useMemo(() => {
    return todoList.filter(filter(filterType));
  }, [todoList, filterType]);
  const toggle = (id: string) => {
    updateTodoList(draft => {
      draft
        .filter(x => x.id === id)
        .forEach(x => {
          x.done = !x.done;
        });
    });
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        updateTodoList(draft => {
          draft.push({
            text,
            done: false,
            id: uuid()
          });
        });
      }}
    >
      <h2>todomvc hook版 </h2>
      <input value={text} onChange={e => updateText(e.target.value)}></input>
      <div>
        {loading && <div>loading....</div>}
        {!loading &&
          filterdList.map(x => <Todo item={x} onClick={toggle} key={x.id} />)}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
};
