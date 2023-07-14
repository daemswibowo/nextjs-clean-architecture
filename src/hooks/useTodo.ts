import { TodoContext } from "@/providers/todoProvider";
import { useContext } from "react";

const useTodo = () => useContext(TodoContext);

export default useTodo;
