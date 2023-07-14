import type { TodoRepository } from "../repositories/todo";
import { TodoRepositoryImpl } from "@/data/repositories/todoRepositoryImpl";
import { Todo } from "../entities/todo";
import { inject, injectable } from "inversify";
import di from "@/injection";

@injectable()
export class GetTodosList {
  constructor(@inject(TodoRepositoryImpl) private repo: TodoRepository) {}
  async execute(): Promise<Todo[]> {
    return await this.repo.getAll();
  }
}
