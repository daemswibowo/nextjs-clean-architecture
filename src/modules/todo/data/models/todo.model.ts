import Todo from "@/modules/todo/domain/entities/todo";

export default class TodoModel {
    constructor(
        public id: number,
        public userId: number,
        public completed: boolean,
        public title: string,
    ) {
    }

    /**
     * Transform todo model to todo entity
     */
    toEntity(): Todo {
        return {
            id: this.id,
            userId: this.userId,
            completed: this.completed,
            title: this.title,
        }
    }

    /**
     * Transform object to TodoModel
     * @param obj
     */
    static fromObject(obj: any): TodoModel {
        return new TodoModel(obj['id'], obj['userId'], obj['completed'], obj['title']);
    }
}
