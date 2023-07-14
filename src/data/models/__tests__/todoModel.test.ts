import { TodoModel } from "../todoModel";

describe("todo model test =>", () => {
  it("fromJson", () => {
    // Arrange
    const json = {
      id: 1,
      title: "title",
      completed: false,
    };
    // Act
    const todoModel = TodoModel.fromJson(json);
    // Assert
    expect(todoModel).toBeInstanceOf(TodoModel);
    expect(todoModel).toStrictEqual(new TodoModel(json));
  });

  it("fromJsonList", () => {
    // Arrange
    const jsonList = [
      {
        id: 1,
        title: "title",
        completed: false,
      },
      {
        id: 2,
        title: "title",
        completed: false,
      },
    ];
    // Act
    const todoModelList = TodoModel.fromJsonList(jsonList);
    // Assert
    expect(todoModelList).toHaveLength(2);
    expect(todoModelList[0]).toBeInstanceOf(TodoModel);
    expect(todoModelList[0]).toStrictEqual(new TodoModel(jsonList[0]));
    expect(todoModelList[1]).toBeInstanceOf(TodoModel);
    expect(todoModelList[1]).toStrictEqual(new TodoModel(jsonList[1]));
  });

  it("toEntity", () => {
    // Arrange
    const todoModel = new TodoModel({
      id: 1,
      title: "title",
      completed: false,
    });

    // Act
    const todo = todoModel.toEntity();

    // Assert
    expect(todo).toStrictEqual({
      id: 1,
      title: "title",
      completed: false,
    });
  });
});
