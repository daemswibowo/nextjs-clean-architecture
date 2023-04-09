import {autoInjectable} from "tsyringe";
import {TodoRepository} from "@/modules/todo/data/todo.repository";
import {BaseResponse} from "@/modules/core/common/baseResponse";
import Todo from "@/modules/todo/domain/entities/todo";
import di from "@/common/di";

@autoInjectable()
export default class GetTodosList {
    constructor(private repo: TodoRepository) {
    }

    /**
     * Execute get todos list
     */
    async execute(): Promise<BaseResponse<Todo[]>> {
        return await this.repo.getTodosList();
    }
}

export const getTodosList = di.resolve<GetTodosList>(GetTodosList);
