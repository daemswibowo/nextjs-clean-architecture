import {autoInjectable} from "tsyringe";
import {TodoRemoteDataSource} from "@/modules/todo/data/todo.remote";
import {BaseResponse} from "@/modules/core/common/baseResponse";
import Todo from "@/modules/todo/domain/entities/todo";

export abstract class TodoRepository {
    abstract getTodosList(): Promise<BaseResponse<Todo[]>>;
}

@autoInjectable()
export default class TodoRepositoryImpl implements TodoRepository {
    constructor(private remoteDataSource: TodoRemoteDataSource) {
    }

    /**
     * Get todos list
     */
    async getTodosList(): Promise<BaseResponse<Todo[]>> {
        const result = await this.remoteDataSource.getTodosList();
        return {
            ...result,
            data: result.data ? result.data.map(todo => ({
                id: todo.id,
                userId: todo.userId,
                completed: todo.completed
            })) : [],
        }
    }
}
