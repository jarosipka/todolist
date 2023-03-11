import { useState, useEffect } from "react";
import FilterButtons from "./components/FilterButtons";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/ToDoItem";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    // filter todos based on selected filter
    const filteredTodos = todos.filter((todo) => {
      if (filter === "all") {
        return true;
      }
      if (filter === "active") {
        return !todo.completed;
      }
      if (filter === "completed") {
        return todo.completed;
      }
      return false; // add this line to return a value at the end of the function
    });

    // if there is a search term, filter the list by title or text
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return filteredTodos.filter((todo) => {
        const lowerCaseTitle = todo.title.toLowerCase();
        const lowerCaseText = todo.text.toLowerCase();
        return (
          lowerCaseTitle.includes(lowerCaseSearchTerm) ||
          lowerCaseText.includes(lowerCaseSearchTerm)
        );
      });
    }

    // if there is no search term, return the filtered list
    return filteredTodos;
  };

  // render the todo list

  return (
    <>
      {/* render the todo form */}
      <div className="filter-container">
        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
      <TodoForm onSubmit={onSubmit} className="todo-form" />
      {/* render the list of todo items */}
      <div className="todo-items-container">
        {displayedTodos.map((todo, index) => (
          <TodoItem
            className="todo-item"
            key={index}
            todo={todo}
            index={index}
            filter={filter}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;
