import { Todo } from "../entities/todo";

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
}
