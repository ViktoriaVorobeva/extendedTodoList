import type { EditedStatus, Todo } from "../../types";

export const editList = (list: Todo[], name: string, status: EditedStatus) => {
  const index = list.findIndex((el) => el.name === name);
  const copyList = list;
  copyList[index].status = status;
  return copyList;
};

export const filterList = (list: Todo[], key: string) => {
  return list.filter((todo) => todo.status === key);
};