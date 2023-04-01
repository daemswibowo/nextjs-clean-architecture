import {BaseResponse} from "@/modules/core/common/baseResponse";
import TodoModel from "@/modules/todo/data/models/todo.model";
import TodosResponseModel from "@/modules/todo/data/models/todosResponse.model";
import HttpClient from "@/modules/core/data/adapters/httpClient";
import {autoInjectable} from "tsyringe";

export abstract class TodoRemoteDataSource {
    abstract getTodosList(): Promise<BaseResponse<TodoModel[]>>;
}

@autoInjectable()
export class TodoRemoteDataSourceImpl implements TodoRemoteDataSource {
    constructor(private client: HttpClient) {
    }

    /**
     * Get todos list
     */
    async getTodosList(): Promise<BaseResponse<TodoModel[]>> {
        const result = await this.client.sendGetRequest<TodoModel[]>('https://jsonplaceholder.typicode.com/todos');

        return {
            ...result,
            data: result.data ? TodosResponseModel.fromArrayObject(result.data).todos : null,
        }
    }
}
