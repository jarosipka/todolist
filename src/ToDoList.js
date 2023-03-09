import { useState, useEffect } from "react";
import FilterButtons from "./components/FilterButtons";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/ToDoItem";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToDoList.css";

function TodoList() {
  // state variables
  const [todos, setTodos] = useState([]); // all todos fetched from API
  const [filter, setFilter] = useState("all"); // filter to display active/completed/all todos
  const [searchTerm, setSearchTerm] = useState(""); // search term to filter todos by title
  const [displayedTodos, setDisplayedTodos] = useState([]); // todos to display after filtering

  // fetch all todos from the API on mount
  useEffect(() => {
    axios
      .get("https://64061a4440597b65de4a6d35.mockapi.io/todolist")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // update displayed todos based on filter and search term
  useEffect(() => {
    setDisplayedTodos(filterAndSearchTodos(todos, filter, searchTerm));
  }, [filter, searchTerm, todos]);

  // handle form submission and validation
  const onSubmit = async (data) => {
    try {
      await TodoForm.schema.validate(data, { abortEarly: false });
      setTodos([...todos, { ...data, completed: false }]);
      TodoForm.reset();
    } catch (errors) {
      errors.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  // handle completion of a todo
  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // handle deletion of a todo
  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // filter and search todos based on filter and search term
  const filterAndSearchTodos = (todos, filter, searchTerm) => {
    return todos
      .filter((todo) => {
        if (filter === "all") {
          return true;
        }
        if (filter === "active") {
          return !todo.completed;
        }
        if (filter === "completed") {
          return todo.completed;
        }
      })
      .filter((todo) => {
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  };

  // render the todo list
  return (
    <>
      {/* render the filter buttons */}
      <div className="filter-container">
        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
      {/* render the todo form */}
      <TodoForm onSubmit={onSubmit} className="todo-form" />

      {/* render the list of todo items */}
      <ul className="todo-items-container">
        {displayedTodos.map((todo, index) => (
          <TodoItem
            className="todo-item"
            key={index}
            todo={todo}
            index={index}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
