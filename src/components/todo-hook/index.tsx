import React, { useState, useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import { useMount, useAsync } from "react-use";
import { fetchDetail, fetchList } from "../../service/todo";
import { uuid } from "uuidv4";
import styled from "styled-components";
const TodoX = styled.div<{ done: boolean }>`
  cursor: pointer;
  font-size: 16px;
  margin-top: 5px;
  text-decoration: ${p => (p.done ? "line-through" : "none")};
`;
const FilterWrapper = styled.div`
  display: flex;
`;
const FilterItem = styled.div<{ selected: boolean }>`
  border: 1px solid transparent;
  border-color: ${p => (p.selected ? "red" : "transparent")};
`;
export const enum FILTERTYPE {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  done = "done"
}
export const Todo = ({
  item,
  onClick
}: {
  item: Item;
  onClick: (id: string) => void;
}) => {
  const desc = useAsync<Description>(async () => {
    return fetchDetail(item.id);
  }, []);
  return (
    <TodoX onClick={() => onClick(item.id)} done={item.done}>
      {item.text} :{" "}
      {desc.loading
        ? "loading ...."
        : desc.error
        ? "error"
        : desc.value?.description}
    </TodoX>
  );
};
export const Filter = ({
  type,
  handleSetType
}: {
  type: FILTERTYPE;
  handleSetType: (x: FILTERTYPE) => void;
}) => {
  const Item = (filtertype: FILTERTYPE) => (
    <FilterItem
      selected={filtertype === type}
      onClick={() => handleSetType(filtertype)}
    >
      {filtertype}
    </FilterItem>
  );
  return (
    <FilterWrapper>
      {Item(FILTERTYPE.ALL)}
      {Item(FILTERTYPE.done)}
      {Item(FILTERTYPE.ACTIVE)}
    </FilterWrapper>
  );
};
export const filter = (filterType: FILTERTYPE) => (x: Item) => {
  switch (filterType) {
    case FILTERTYPE.ALL:
      return true;
    case FILTERTYPE.ACTIVE:
      return !x.done;
    case FILTERTYPE.done:
      return x.done;
  }
};
export const TodoList = ({ initialTodos = [] }: { initialTodos?: Item[] }) => {
  const [todoList, updateTodoList] = useImmer(initialTodos);
  const [text, updateText] = useState("");
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const { loading } = useAsync(async () => {
    // handle ssr prefetch data
    if (todoList.length === 0) {
      const result = await fetchList();
      updateTodoList(draft => result);
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
      <h1>todomvc hook版 </h1>
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
