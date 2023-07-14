import { Todo } from "@/domain/entities/todo";

export interface ITodoModel {
  id: number;
  title: string;
  completed: boolean;
}

export class TodoModel {
  id: number;
  title: string;
  completed: boolean;

  constructor(todo: ITodoModel) {
    this.id = todo.id;
    this.title = todo.title;
    this.completed = todo.completed;
  }

  static fromJson(json: { [x: string]: any }): TodoModel {
    return new TodoModel({
      id: json.id,
      title: json.title,
      completed: json.completed,
    });
  }

  static fromJsonList(jsonList: any[]): TodoModel[] {
    return jsonList.map((json) => TodoModel.fromJson(json));
  }

  toEntity(): Todo {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
    };
  }
}
