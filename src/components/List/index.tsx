import { FC, useContext, useEffect, useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { TodosContext } from "../../context";
import type { Todo } from "../../types";
import { editList, filterList } from "./list.helpers";

const listStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "20px",
};

const notFirstItemStyle: React.CSSProperties = {
  border: "1px solid black",
  borderTop: 'none',
  padding: "10px",
};

const firstItemStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "10px",
};

const ButtonStyle: React.CSSProperties = {
  textDecoration: "line-through",
};

export const ListComponent: FC<{
  status: "active" | "completed" | "all";
}> = ({ status }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const context = useContext(TodosContext);

  const { todos, setTodos, count, setCount } = context;

  const handleToggle = (todo: Todo) => () => {
    const currentIndex = checked.indexOf(todo.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todo.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    const array = editList(todos, todo.name);

    if (status !== "all") {
      setFilteredTodos(filterList(array, status));
    }

    setTodos(array);

    setCount(count - 1);
  };

  useEffect(() => {
    if (status !== "all") {
      setFilteredTodos(filterList(todos, status));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, status]);

  return (
    <List data-testid="todos-list" style={listStyle}>
      {filteredTodos.map((todo, index) => {
        const itemStyle = index === 0 ? firstItemStyle : notFirstItemStyle;

        return (
          <ListItem key={todo.id} style={itemStyle}>
            <ListItemButton
              data-testid={`checkbox-${index}`}
              role={undefined}
              onClick={handleToggle(todo)}
              disabled={checked.includes(todo.id)}
              style={{ ...(checked.includes(todo.id) ? ButtonStyle : null) }}
            >
              <ListItemIcon>
                <Checkbox checked={checked.includes(todo.id)} />
              </ListItemIcon>
              <ListItemText key={todo.id} primary={todo.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};