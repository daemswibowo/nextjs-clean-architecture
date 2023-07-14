import { TodoRepository } from "@/domain/repositories/todo";
import { Todo } from "@/domain/entities/todo";
import { inject, injectable } from "inversify";
import * as todoRemote from "../sources/todoRemote";

@injectable()
export class TodoRepositoryImpl implements TodoRepository {
  private _remote: todoRemote.TodoRemoteDataSource;

  constructor(
    @inject(todoRemote.TodoRemoteDataSourceImpl)
    remote: todoRemote.TodoRemoteDataSource
  ) {
    this._remote = remote;
  }

  async getAll(): Promise<Todo[]> {
    const todos = await this._remote.getAll();
    return todos.map((todo) => todo.toEntity());
  }
}
