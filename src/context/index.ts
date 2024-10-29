import * as React from "react";
import type { ContextValue } from "../types";

//@ts-expect-error начальное null
export const TodosContext = React.createContext<ContextValue>(null);