import { Container } from "inversify";
import { GetTodosList } from "./domain/useCases/getTodosList";
import {
  TodoRemoteDataSource,
  TodoRemoteDataSourceImpl,
} from "./data/sources/todoRemote";
import { TodoRepositoryImpl } from "./data/repositories/todoRepositoryImpl";
import { TodoRepository } from "./domain/repositories/todo";

const di = new Container();

// data sources
di.bind<TodoRemoteDataSource>(TodoRemoteDataSourceImpl).toSelf();

// repositories
di.bind<TodoRepository>(TodoRepositoryImpl).toSelf();

// use cases
di.bind<GetTodosList>(GetTodosList).toSelf();

export const getTodosList = di.get<GetTodosList>(GetTodosList);

export default di;
