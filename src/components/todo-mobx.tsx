import React, { useState } from "react";
import { uuid } from "uuidv4";
import { fetchDetail, fetchList } from "../service/todo";
import { filter, FILTERTYPE, Todo, Filter } from "./todo-hook";
import {
  observer,
  useComputed,
  useDisposable,
  useLocalStore
} from "mobx-react-lite";
import { useAsync } from "react-use";
// 业务模型
const model = (initialTodoList: Item[] = []) => ({
  todoList: initialTodoList,
  toggle(id: string) {
    this.todoList
      .filter(x => x.id === id)
      .forEach(x => {
        x.completed = !x.completed;
      });
  },
  async fetchTodoList() {
    const result = await fetchList();
    this.todoList.push(...result);
  },
  addTodo(text: string) {
    this.todoList.push({
      text,
      completed: false,
      id: uuid()
    });
  }
});
export const TodoList = observer(
  ({ initialTodoList = [] }: { initialTodoList?: Item[] }) => {
    const store = useLocalStore(() => model(initialTodoList));
    const [filterType, updateFilterType] = useState(FILTERTYPE.ALL);
    const filteredList = useComputed(() => {
      return store.todoList.filter(filter(filterType));
    }, [filterType]);
    const { loading } = useAsync(async () => {
      if (!store.todoList.length) {
        return store.fetchTodoList();
      }
    });
    const [text, updateText] = useState("");
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          store.addTodo(text);
        }}
      >
        <h1>todomvc mobx版</h1>
        <input value={text} onChange={e => updateText(e.target.value)}></input>
        <div>
          {loading && <div>loading....</div>}
          {!loading &&
            filteredList.map(x => (
              <Todo item={x} onClick={store.toggle} key={x.id} />
            ))}
        </div>
        <Filter type={filterType} handleSetType={updateFilterType} />
      </form>
    );
  }
);
