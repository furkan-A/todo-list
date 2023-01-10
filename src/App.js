import "./App.css";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const localeTodoList = JSON.parse(localStorage.getItem("todoList"));
  const localeActiveTaskCount = JSON.parse(
    localStorage.getItem("activeTaskCount")
  );
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(
    localeTodoList ? localeTodoList : []
  );
  const [activeTaskCount, setActiveTaskCount] = useState(
    localeActiveTaskCount ? localeActiveTaskCount : 0
  );

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("activeTaskCount", activeTaskCount);
  }, [todoList, activeTaskCount]);

  const addTodo = () => {
    if (todo === "") return;
    setTodoList([
      ...todoList,
      { id: uuidv4(), todo: todo, isEditable: true, isCompleted: false },
    ]);
    console.log(todo);
    setActiveTaskCount(activeTaskCount + 1);
    setTodo("");
  };

  const deleteTodo = todo => {
    setTodoList(todoList.filter(todoItem => todoItem.id !== todo.id));
    if (!todo.isCompleted) setActiveTaskCount(activeTaskCount - 1);
  };

  const completeTodo = todo => {
    setTodoList(prevTodoList =>
      prevTodoList.map(todoItem =>
        todoItem.id === todo.id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
    if (!todo.isCompleted) setActiveTaskCount(activeTaskCount - 1);
    else setActiveTaskCount(activeTaskCount + 1);
  };

  const clearCompleted = () => {
    setTodoList(todoList.filter(todoItem => !todoItem.isCompleted));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1>todos</h1>
      <div className="d-flex w-50 mt-4">
        <Form.Control
          placeholder="Enter a task name"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <Button className="ms-3" onClick={addTodo}>
          Submit
        </Button>
      </div>
      <div className="d-flex flex-column w-50 mt-4">
        {todoList.map(todo => (
          <div key={todo.id} className="d-flex mt-2 justify-content-between">
            <div className="d-flex">
              <Form.Check
                type="switch"
                className="me-3"
                checked={todo.isCompleted}
                onChange={() => completeTodo(todo)}
              />
              <label
                className={
                  todo.isCompleted ? "text-decoration-line-through" : "fw-bold"
                }
              >
                {todo.todo}
              </label>
            </div>
            <FaTrash
              icon="fa-light fa-trash"
              style={{ cursor: "pointer" }}
              onClick={() => deleteTodo(todo)}
            />
          </div>
        ))}
      </div>
      <div className="d-flex w-50 mt-4 justify-content-between">
        <div className="d-flex">{activeTaskCount} items left</div>
        <Button
          className="mrew"
          variant="outline-secondary"
          size="sm"
          onClick={clearCompleted}
        >
          Clear Completed
        </Button>
      </div>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
