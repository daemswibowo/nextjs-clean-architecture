import {TodoRemoteDataSourceImpl} from "@/modules/todo/data/todo.remote";
import todosJson from './dummies/todosResponse.json'
import {tTodosResponseModel} from "@/modules/todo/data/__tests__/dummies";
import HttpClient from "@/modules/core/data/adapters/httpClient";

jest.mock('@/modules/core/data/adapters/httpClient');
jest.mock('axios');

describe('TodoRemoteDataSource test', () => {
    const client = new HttpClient('asdf');
    const remoteDataSource = new TodoRemoteDataSourceImpl(client);

    describe('getTodosList()', () => {
        it('should return success when get todos list', async () => {
            // arrange
            const mockClient = jest.spyOn(client, 'sendGetRequest');
            mockClient.mockResolvedValueOnce({data: todosJson, error: null});

            // action
            const result = await remoteDataSource.getTodosList();
            
            // assert
            expect(client.sendGetRequest).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
            expect(result.data).toEqual(tTodosResponseModel.todos);
        });
    });
});
