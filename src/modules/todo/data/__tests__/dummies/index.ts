import TodosResponseModel from "@/modules/todo/data/models/todosResponse.model";
import todosResponse from './todosResponse.json';
import Todo from "@/modules/todo/domain/entities/todo";

export const tTodosResponseModel = TodosResponseModel.fromArrayObject(todosResponse);

export const tTodosList: Todo[] =  tTodosResponseModel.todos.map((todo) => todo.toEntity());
