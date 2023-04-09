import {useTodoContext} from "@/modules/todo/presentation/todo.context";
import {useReducer} from "react";

export default function useTodo() {
    const result = useTodoContext();
    const [state, dispatch] = useReducer<{}>()

    const fetchTodos = async () => {

    }

    return {
        ...result,
        fetchTodos,
    }
}
