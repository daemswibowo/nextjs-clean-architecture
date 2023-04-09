import {render} from "@testing-library/react";
import TodoProvider from "@/modules/todo/presentation/todo.provider";

describe('OrganismTodoListSection tests', function () {
    it('should display todos when success getting data from remote data source', function () {
        // arrange
        const mockFetchTodos = jest.fn();
        const {} = render(
            <TodoProvider>

            </TodoProvider>
        );
        // action

        // assert

    });
});
