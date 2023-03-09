import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "./TodoForm.css";

// define a Yup schema to validate form input
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  deadline: Yup.date().required("Deadline is required"),
});

function TodoForm({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);

  // initialize useForm hook and register form fields
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // import reset function from useForm hook
  } = useForm();

  // define handler function for form submission
  const handleFormSubmit = async (data) => {
    await onSubmit(data); // call the onSubmit function passed as props
    const form = document.querySelector(".todo-form");
    if (form.checkValidity()) {
      reset(); // reset form values after successful submission
    }
  };

  // define handler function for closing the form
  const handleCloseClick = () => {
    setShowForm(false);
  };

  // render the TodoForm component
  if (!showForm) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
      >
        Add new to do
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="todo-form">
      <TextField {...register("title")} label="Title" />
      {errors.title && <p>{errors.title.message}</p>}
      <TextField {...register("text")} label="Text" multiline minRows={4} />
      {errors.text && <p>{errors.text.message}</p>}
      <TextField
        {...register("deadline")}
        label="Deadline"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
      />

      {errors.deadline && <p>{errors.deadline.message}</p>}
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button type="submit">Add todo</Button>
        <Button onClick={handleCloseClick}>Close</Button>
      </ButtonGroup>
    </form>
  );
}

// attach the Yup schema and reset function to the TodoForm component object
TodoForm.schema = schema;
TodoForm.reset = () => {};

export default TodoForm;
