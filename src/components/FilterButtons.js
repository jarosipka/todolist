import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./FilterButtons.css";

function FilterButtons({ filter, setFilter, setSearchTerm, searchTerm }) {
  // define handler functions for button and search bar clicks
  // function to set the filter when a filter button is clicked
  const handleFilterClick = (filter) => {
    setFilter(filter);
  };

  // function to set the search term when the input field changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // render the filter buttons and search bar
  return (
    <div className="filter-buttons">
      {/* Button to show all todos */}
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("all")}
      >
        All
      </Button>

      {/* Button to show active todos */}
      <Button
        variant={filter === "active" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("active")}
      >
        Active
      </Button>

      {/* Button to show completed todos */}
      <Button
        variant={filter === "completed" ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("completed")}
      >
        Completed
      </Button>

      {/* Search bar to filter todos by title or text */}
      <div className="search-bar">
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default FilterButtons;
