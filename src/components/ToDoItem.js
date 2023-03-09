import { Checkbox, Button } from "@material-ui/core"; // import necessary components from Material-UI library
import "./ToDoItem.css";

function TodoItem({ todo, index, handleComplete, handleDelete }) {
  // destructure properties from the 'todo' object passed as props
  const { title, text, deadline, completed = false } = todo;

  // define handler functions for checkbox and delete button clicks
  const handleCheckboxChange = () => {
    handleComplete(index);
  };

  const handleDeleteClick = () => {
    handleDelete(index);
  };

  // render the TodoItem component
  return (
    <div className="todo-item">
      <li className="todo-item">
        <label>
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            color="primary"
          />
          <span className={completed ? "completed" : ""}>
            <h2 className="todo-title">{title}</h2>
          </span>
        </label>
        <div className="todo-details">
          <span className="todo-text">{text}</span>
          <span className="todo-deadline">
            {new Date(deadline).toLocaleString()}
          </span>
        </div>
        <div className="todo-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckboxChange}
          >
            {completed ? "Undo" : "Complete"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </li>
    </div>
  );
}

export default TodoItem;
