import React, { useState, useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import { uuid } from "uuidv4";
import styled from "styled-components";
const TodoX = styled.div<{ completed: boolean }>`
  text-decoration: ${p => (p.completed ? "line-through" : "none")};
`;
const FilterWrapper = styled.div`
  display: flex;
`;
const FilterItem = styled.div<{ selected: boolean }>`
  border: 1px solid transparent;
  border-color: ${p => (p.selected ? "red" : "transparent")};
`;
const enum FILTERTYPE {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED"
}
interface Item {
  text: string;
  completed: boolean;
  id: string;
}
const Todo = ({
  item,
  onClick
}: {
  item: Item;
  onClick: (id: string) => void;
}) => {
  return (
    <TodoX onClick={() => onClick(item.id)} completed={item.completed}>
      {item.text}
    </TodoX>
  );
};
const Filter = ({
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
      {Item(FILTERTYPE.COMPLETED)}
      {Item(FILTERTYPE.ACTIVE)}
    </FilterWrapper>
  );
};
export const TodoList = ({ defaultValue = [] }: { defaultValue?: Item[] }) => {
  const [todoList, updateTodoList] = useImmer(defaultValue);
  const [text, updateText] = useState("");
  const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
  const filterdList = useMemo(() => {
    return todoList.filter(x => {
      switch (filterType) {
        case FILTERTYPE.ALL:
          return true;
        case FILTERTYPE.ACTIVE:
          return !x.completed;
        case FILTERTYPE.COMPLETED:
          return x.completed;
      }
    });
  }, [todoList, filterType]);
  const toggle = (id: string) => {
    updateTodoList(draft => {
      draft
        .filter(x => x.id === id)
        .forEach(x => {
          x.completed = !x.completed;
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
            completed: false,
            id: uuid()
          });
        });
      }}
    >
      <input value={text} onChange={e => updateText(e.target.value)}></input>
      <div>
        {filterdList.map(x => (
          <Todo item={x} onClick={toggle} />
        ))}
      </div>
      <Filter type={filterType} handleSetType={updateFilterType} />
    </form>
  );
};
