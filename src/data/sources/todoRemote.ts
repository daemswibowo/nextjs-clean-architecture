import { TodoModel } from "../models/todoModel";
import { injectable } from "inversify";
export interface TodoRemoteDataSource {
  getAll(): Promise<TodoModel[]>;
}

@injectable()
export class TodoRemoteDataSourceImpl implements TodoRemoteDataSource {
  async getAll(): Promise<TodoModel[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return TodoModel.fromJsonList(await response.json());
  }
}
