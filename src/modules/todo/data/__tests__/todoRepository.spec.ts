import HttpClient from "@/modules/core/data/adapters/httpClient";
import {TodoRemoteDataSourceImpl} from "@/modules/todo/data/todo.remote";
import TodoRepositoryImpl from "@/modules/todo/data/todo.repository";
import {tTodosList, tTodosResponseModel} from "@/modules/todo/data/__tests__/dummies";

describe('TodoRepositoryImpl', () => {
    const client = new HttpClient('todos');
    const remoteDataSource = new TodoRemoteDataSourceImpl(client);
    const repository = new TodoRepositoryImpl(remoteDataSource);

    it('should success when get todos list', async () => {
        // arrange
        const mockRemoteDataSource = jest.spyOn(remoteDataSource, 'getTodosList');
        mockRemoteDataSource.mockResolvedValueOnce({data: tTodosResponseModel.todos, error: null});

        // action
        const result = await repository.getTodosList();

        // assert
        expect(remoteDataSource.getTodosList).toHaveBeenCalled();
        expect(result.data).toEqual(tTodosList);
    });
});
