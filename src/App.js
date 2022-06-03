import React from "react";
import "./App.css";

function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState("");

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage("Activity cannot be empty!");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity: activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);
      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
      },
    ]);
    setActivity("");
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);

    if (edit.id) {
      cancelEditHandler();
    }
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      id: todo.id,
      activity: todo.activity,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  function counter() {
    return todos.length;
  }

  function removeAll() {
    return setTodos([]);
  }

  return (
    <div className="wrapper">
      <header>Todo List</header>
      {message && <div style={{ color: "red" }}>{message}</div>}

      <form onSubmit={saveTodoHandler}>
        <div className="inputField">
          <input
            type="text"
            placeholder="Create New Activity"
            value={activity}
            onChange={function (event) {
              setActivity(event.target.value);
            }}
          />
          <button type="submit">
            {edit.id ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </button>
          {edit.id && (
            <button onClick={cancelEditHandler} className="batal">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </form>
      <ul className="task-box">
        {todos.map(function (todo) {
          return (
            <li className="task" key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.done ? <del>{todo.activity}</del> : todo.activity}
              </label>
              <div className="settings">
                {/* <button onClick={editTodoHandler.bind(this, todo)}>
                    Edit
                  </button>
                  <button onClick={removeTodoHandler.bind(this, todo.id)}>
                    <span>
                      <i className="fas fa-trash"></i>
                    </span>
                  </button> */}
                <i className="uil uil-ellipsis-h"></i>
                <ul className="task-menu">
                  <li>
                    <div onClick={editTodoHandler.bind(this, todo)}>
                      <i className="uil uil-pen" style={{ color: "blue" }}></i>
                      Edit
                    </div>
                  </li>
                  <li>
                    <div onClick={removeTodoHandler.bind(this, todo.id)}>
                      <i className="uil uil-trash" style={{ color: "red" }}></i>
                      Delete
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      <p>
        <div class="footer">
          <i>You have {counter()} activities</i>
          <button onClick={removeAll.bind(this)}>Clear All</button>
        </div>
      </p>
    </div>
  );
}

export default App;
