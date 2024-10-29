import * as React from "react";
import { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import SendIcon from "@mui/icons-material/Send";

import { TabsComponent } from "../../components/Tabs";
import { TodosContext } from "../../context";
import type { Todo } from "../../types";

const inputStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "stretch",
  minHeight: "50px",
  marginBottom: "20px",
};

const titleStyle: React.CSSProperties = {
  margin: "0",
  marginBottom: "20px",
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#1976d2",
  width: "56px",
  borderRadius: "4px",
  color: "#ffffff",
};

export const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  function addTodo() {
    if (value !== "") {
      const newTodos = todos;
      newTodos.push({
        name: value,
        id: nanoid(),
        status: "active",
        create_at: new Date(),
      });

      setTodos(newTodos);
      setValue("");
      setCount(count + 1);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function handleButtonClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    addTodo();
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos, count, setCount }}>
      <Typography variant="h1" gutterBottom style={titleStyle}>
        todos
      </Typography>
      <Box style={inputStyle}>
        <TextField
          value={value}
          hiddenLabel
          fullWidth
          id="filled-hidden-label-normal"
          placeholder="What needs to be done?"
          variant="filled"
          data-testid="input"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <IconButton
          style={buttonStyle}
          aria-label="add-todo"
          data-testid="button-add"
          onClick={handleButtonClick}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <TabsComponent />
    </TodosContext.Provider>
  );
};
