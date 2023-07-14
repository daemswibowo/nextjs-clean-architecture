import useTodo from "@/hooks/useTodo";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

type AddTaskForm = {
  task: string;
};

export default function Home() {
  const { todos, error, updateTodo, addTodo } = useTodo();
  const { handleSubmit, register, reset, watch } = useForm<AddTaskForm>({
    defaultValues: {
      task: "",
    },
  });

  function onSubmit(values: AddTaskForm) {
    if (values.task) {
      addTodo({
        id: new Date().getTime(),
        title: values.task,
        completed: false,
      });

      // reset form
      reset();
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* tailwind todo list container */}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-medium text-black dark:text-white">
            Todo List
          </h2>
        </div>
        {/* start add task input */}
        <div className="relative w-full mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="create-task"
              data-testid="add-todo-input"
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 border-transparent rounded-md dark:bg-gray-800 dark:text-gray-200 focus:border-indigo-500 focus:ring-0"
              placeholder="Create a new task"
              {...register("task")}
            />
            <button
              data-testid="add-todo-button"
              type="submit"
              className="absolute top-0 right-0 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add
            </button>
          </form>
        </div>
        {/* end add task input */}
        {/* start todo list */}
        <div
          data-testid="todo-list"
          className="flex flex-col items-center justify-center w-full mt-4"
        >
          {/* display error message */}
          {error ? (
            <div
              data-testid="error-message"
              className="flex items-center justify-center w-full p-2 my-2 bg-red-100 rounded-md dark:bg-red-700"
            >
              <p className="text-sm font-medium text-red-800 dark:text-red-100">
                {error}
              </p>
            </div>
          ) : null}
          {todos.map((todo) => (
            <div
              key={`todo-list-${todo.id}`}
              className="flex items-center justify-between w-full p-2 my-2 bg-gray-100 rounded-md dark:bg-gray-700"
            >
              <div className="flex items-center">
                <input
                  id={`todo-completed-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => {
                    updateTodo({
                      ...todo,
                      completed: !todo.completed,
                    });
                  }}
                  type="checkbox"
                  className="w-4 h-4 mr-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`todo-completed-${todo.id}`}
                  className={`text-sm font-medium text-gray-800 dark:text-gray-100 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </label>
              </div>
            </div>
          ))}
        </div>
        {/* end todo list */}
      </div>
    </main>
  );
}
