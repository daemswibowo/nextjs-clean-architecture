import TodoModel from "@/modules/todo/data/models/todo.model";
import Todo from "@/modules/todo/domain/entities/todo";

describe('TodoModel', () => {
    const todo: Todo = {id: 1, userId: 1, completed: false};

    it('toEntity', () => {
        // arrange
        const todoModel = new TodoModel(1, 1, false);

        // action
        const result = todoModel.toEntity();

        // assert
        expect(result).toEqual(todo);
    });

    it('fromObject', () => {
        // arrange
        const obj = {id: 1, userId: 1, completed: false};

        // action
        const result = TodoModel.fromObject(obj);

        // assert
        expect(result).toBeInstanceOf(TodoModel);
    })
});
