import { Todo } from "@/domain/entities/todo";
import { getTodosList } from "@/injection";
import { createContext, useState, useEffect } from "react";

export type ITodoContext = {
  todos: Todo[];
  isLoading: boolean;
  error?: string;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
};

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };
  const removeTodo = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };
  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const todos = await getTodosList.execute();
      setTodos(todos);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        isLoading,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
