import {createContext} from "react";
import Todo from "@/modules/todo/domain/entities/todo";
import {ITodoState} from "@/modules/todo/presentation/providers/todo.reducer";
import {BaseResponse} from "@/modules/core/common/baseResponse";

export type ITodoContext = ITodoState & {
    getTodos: () => Promise<BaseResponse<Todo[]>>;
}
const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export default TodoContext;
