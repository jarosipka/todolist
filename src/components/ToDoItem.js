import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "./ToDoItem.css";

function TodoItem({ todo, index, handleComplete, handleDelete, filter }) {
  // destructure properties from the 'todo' object passed as props
  const { title, text, deadline, completed = false } = todo;

  // define handler functions for checkbox and delete button clicks
  const handleCheckboxChange = () => {
    // check if filter is set to "active" or "completed" and return early without calling handleComplete if true
    if (filter === "active" || filter === "completed") {
      return;
    }
    handleComplete(index);
  };

  const handleDeleteClick = () => {
    handleDelete(index);
  };

  // render the TodoItem component
  return (
    <div className="todo-item">
      <label>
        {/* render the title and checkbox */}
        <h2 className={`todo-title ${completed ? "completed" : ""}`}>
          {title}
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            color="primary"
            disabled={filter === "active" || filter === "completed"} // disable checkbox if filter is set to "active" or "completed"
          />
        </h2>
      </label>
      {/* render the todo details and delete button */}
      <div className="todo-details">
        <span className="todo-text">{text}</span>
        <span className="todo-deadline">
          {new Date(deadline).toLocaleString()}
        </span>
      </div>
      <IconButton
        aria-label="delete"
        onClick={handleDeleteClick}
        className="delete-button"
      >
        <Delete />
      </IconButton>
    </div>
  );
}

export default TodoItem;
