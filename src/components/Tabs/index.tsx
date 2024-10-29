import { useContext, useState } from "react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Counter } from "../Counter";
import { ListComponent } from "../List";
import { TodosContext } from "../../context";
import { negativeFilterList } from "./tabs.helpers";
import type { Status } from "../../types";

const tabsStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const TabsComponent = () => {
  const [alignment, setAlignment] = useState<Status>("all");
  
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todos, setTodos } = context;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Status
  ) => {
    setAlignment(newAlignment);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setTodos(negativeFilterList(todos, 'completed'));
  };

  return (
    <>
      <ListComponent status={alignment} />
      <Box style={tabsStyle}>
        <Counter />
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="all" data-testid='button-all'>all</ToggleButton>
          <ToggleButton value="active" data-testid='button-active'>active</ToggleButton>
          <ToggleButton value="completed" data-testid='button-completed'>completed</ToggleButton>
        </ToggleButtonGroup>
        <Button onClick={handleButtonClick} variant="contained" data-testid='button-clear'>
          Clear completed
        </Button>
      </Box>
    </>
  );
};
