import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { TodosContext } from "../../context";

export const Counter = () => {
  const [currentCount, setCurrentCount] = useState(0);

  const context = useContext(TodosContext);

  const { count } = context;

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  return (
    <Typography variant="subtitle1" data-testid='count'>
      {currentCount} items left
    </Typography>
  );
};
