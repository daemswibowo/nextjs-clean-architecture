import { getTodosList } from "@/injection";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import Home from "@/pages";
import TodoProvider from "@/providers/todoProvider";
import todos from "./dummy/todos";
describe("home page test =>", () => {
  describe("todos list test =>", () => {
    it("should displaying todos list fetched from server", async () => {
      // arrange
      const mock = jest.spyOn(getTodosList, "execute").mockResolvedValue(todos);

      render(
        <TodoProvider>
          <Home />
        </TodoProvider>
      );

      // act
      const todoList = await screen.findByTestId("todo-list");

      // assert
      expect(mock).toBeCalledTimes(1);
      expect(todoList).toBeInTheDocument();
      expect(todoList).toHaveTextContent("todo 1");
      expect(todoList).toHaveTextContent("todo 2");

      mock.mockRestore();
    });

    it("should display error message when failed to fetch todos list", async () => {
      // arrange
      const mock = jest
        .spyOn(getTodosList, "execute")
        .mockRejectedValue(new Error("failed to fetch todos list"));

      const { findByTestId } = render(
        <TodoProvider>
          <Home />
        </TodoProvider>
      );

      await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));

      // act
      const errorMessage = await findByTestId("error-message");

      // assert
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("failed to fetch todos list");
    });
  });

  describe("add todo test =>", () => {
    it("should add todo to list when user click add button", async () => {
      // arrange
      jest.spyOn(getTodosList, "execute").mockResolvedValue(todos);

      const { findByTestId, findByText } = render(
        <TodoProvider>
          <Home />
        </TodoProvider>
      );

      const addTodoInput = await findByTestId("add-todo-input");
      const addTodoButton = await findByTestId("add-todo-button");

      // act
      addTodoInput.focus();
      fireEvent.change(addTodoInput, { target: { value: "new todo" } });
      fireEvent.submit(addTodoButton);

      // assert
      const todoList = await findByText("new todo");
      expect(todoList).toBeInTheDocument();
    });
  });
});
