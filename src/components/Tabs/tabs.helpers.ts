import type { Todo } from "../../types";

export const negativeFilterList = (list: Todo[], key: string) => {
  return list.filter((todo) => todo.status !== key);
};
