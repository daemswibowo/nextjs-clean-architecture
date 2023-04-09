import {createContext, useContext} from "react";
import Todo from "@/modules/todo/domain/entities/todo";
import {Failure} from "@/modules/core/common/failure";

export type ITodoContext = {
    loading: boolean;
    error: Failure | null;
    data: Todo[];
    setLoading: (loading: boolean) => void;
    setError: (error: Failure | null) => void;
    setData: (data: Todo[]) => void;
}
const TodoContext = createContext<ITodoContext>({
    loading: false,
    error: null,
    data: [],
});

export const useTodoContext = () => useContext(TodoContext);

export default TodoContext;
