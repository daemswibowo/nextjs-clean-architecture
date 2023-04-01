import TodoModel from "./todo.model";

export default class TodosResponseModel {
    constructor(public todos: TodoModel[]) {
    }

    /**
     * Transform todos json object todos model
     * @param json
     */
    static fromJson(json: string): { todos: TodoModel[] } {
        const parsed: any[] = JSON.parse(json);

        return {
            todos: parsed.map((obj: any) => TodoModel.fromObject(obj)),
        }
    }

    /**
     * Transform todos array object todos model
     * @param arr
     */
    static fromArrayObject(arr: any[]): { todos: TodoModel[] } {
        return {
            todos: arr.map((obj: any) => TodoModel.fromObject(obj)),
        }
    }
}
