import {useContext} from "react";
import TodoContext from "@/modules/todo/presentation/providers/todo.context";

const useTodo = () => useContext(TodoContext);

export default useTodo;