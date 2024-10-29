export type Todo = {
    id: string,
    status: 'active' | 'completed',
    create_at: Date,
    name: string,
}

export type ContextValue = {
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>; 
}

export type Status = 'all' | 'active' | 'completed';