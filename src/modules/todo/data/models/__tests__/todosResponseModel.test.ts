import TodoModel from "@/modules/todo/data/models/todo.model";
import TodosResponseModel from "@/modules/todo/data/models/todosResponse.model";

describe('TodosResponseModel', () => {
    const todosResponseModel = new TodosResponseModel([new TodoModel(1, 1, true)]);

    it('fromJson', () => {
        // arrange
        const json = JSON.stringify([{id: 1, userId: 1, completed: true}]);

        // action
        const result = TodosResponseModel.fromJson(json);

        // assert
        expect(result).toEqual(todosResponseModel);
    });

    it('fromArrayObject', () => {
        // arrange
        const json = [{id: 1, userId: 1, completed: true}];

        // action
        const result = TodosResponseModel.fromArrayObject(json);

        // assert
        expect(result).toEqual(todosResponseModel);
    });
});
