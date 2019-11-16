import React from "react";
import { observer } from "mobx-react";
import { useAsync } from "react-use";
import { fetchDetail } from "../service/todo";
import { TodoModel } from "../store/todo.store";

import styled from "styled-components";
export const TodoX = styled.div<{ done: boolean }>`
  cursor: pointer;
  font-size: 16px;
  margin-top: 5px;
  text-decoration: ${p => (p.done ? "line-through" : "none")};
`;
export const FilterWrapper = styled.div`
  display: flex;
`;
export const FilterItem = styled.div<{ selected: boolean }>`
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

export const RichTodo = observer(({ item }: { item: TodoModel }) => {
  const desc = useAsync<Description>(async () => {
    return fetchDetail(item.id);
  }, []);
  return (
    <TodoX
      onClick={() => {
        item.toggleDone();
      }}
      done={item.done}
    >
      {item.text} :{" "}
      {desc.loading
        ? "loading ...."
        : desc.error
        ? "error"
        : desc.value?.description}
    </TodoX>
  );
});

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
