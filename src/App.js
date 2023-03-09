import React from "react";
import ToDoList from "./ToDoList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToDoList />
      <ToastContainer />
    </div>
  );
}

export default App;
