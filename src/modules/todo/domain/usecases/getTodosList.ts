import {autoInjectable, delay, inject} from "tsyringe";
import {TodoRepository, TodoRepositoryImpl} from "@/modules/todo/data/todo.repository";
import {BaseResponse} from "@/modules/core/common/baseResponse";
import Todo from "@/modules/todo/domain/entities/todo";
import di from "@/common/di";

@autoInjectable()
export class GetTodosList {
    constructor(@inject(delay(() => TodoRepositoryImpl)) private repo: TodoRepository) {
    }

    /**
     * Execute get todos list
     */
    async execute(): Promise<BaseResponse<Todo[]>> {
        return await this.repo.getTodosList();
    }
}

export const getTodosList = di.resolve<GetTodosList>(GetTodosList);
