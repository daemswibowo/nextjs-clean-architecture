import TodoContext from "@/modules/todo/presentation/providers/todo.context";
import {ReactNode, useReducer} from "react";
import Todo from "@/modules/todo/domain/entities/todo";
import todoReducer from "@/modules/todo/presentation/providers/todo.reducer";
import {BaseResponse} from "@/modules/core/common/baseResponse";
import {getTodosList} from "@/modules/todo/domain/usecases/getTodosList";

export default function TodoProvider({children}: { children?: ReactNode }) {
    const [state, dispatch] = useReducer(todoReducer, {
        data: [],
        loading: false,
        error: null
    });

    /**
     * Get todos list
     */
    const getTodos = async (): Promise<BaseResponse<Todo[]>> => {
        dispatch({type: 'GET_TODOS'});
        const result = await getTodosList.execute();
        if (result.error) {
            dispatch({type: 'GET_TODOS_FAILURE', error: result.error});
        }

        if (result.data) {
            dispatch({type: 'GET_TODOS_SUCCESS', data: result.data});
        }
        return result;
    }

    return <TodoContext.Provider value={{...state, getTodos}}>
        {children}
    </TodoContext.Provider>
}
