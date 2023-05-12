import {Failure} from "@/modules/core/common/failure";
import Todo from "@/modules/todo/domain/entities/todo";

export type ITodoState = {
    loading: boolean;
    error: Failure | null;
    data: Todo[];
}

type ITodoAction = {
    type: 'GET_TODOS' | 'GET_TODOS_SUCCESS' | 'GET_TODOS_FAILURE';
    data?: Todo[] | null;
    error?: Failure | null;
}

/**
 * Todo reducer
 * @param state
 * @param action
 */
export default function todoReducer(state: ITodoState, action: ITodoAction): ITodoState {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                loading: true,
            }
        case 'GET_TODOS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.data || [],
            }
        case 'GET_TODOS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error || null,
            }
        default:
            return state;
    }
}