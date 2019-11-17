import { TodoList as TodoListHook } from "./components/todo-hook";
import { TodoList as TodoListLocal } from "./components/todo-mobx-local";
import { TodoList as TodoListGlobal } from "./components/todo-mobx-global";
import { configure } from "mobx";
import { Mouse } from "./components/mobx-vue3";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const Row = styled.div`
  display: flex;
  width: 100%;
`;
const Col = styled.div`
  width: 50%;
`;
const GlobalWrap = styled.div``;
const App = () => {
  return (
    <div>
      <GlobalWrap>
        <Row>
          <h1>状态联动</h1>
        </Row>
        <Row>
          <Col>
            <TodoListGlobal />
          </Col>
          <Col>
            <TodoListGlobal />
          </Col>
        </Row>
      </GlobalWrap>
      <div>
        <Row>
          <h1>状态独立</h1>
        </Row>
        <Row>
          <Col>
            <TodoListLocal />
          </Col>
          <Col>
            <TodoListLocal />
          </Col>
        </Row>
      </div>
      <TodoListHook />
      <Mouse />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
