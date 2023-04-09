import TodoContext from "@/modules/todo/presentation/todo.context";
import {ReactNode, useState} from "react";
import Todo from "@/modules/todo/domain/entities/todo";
import {Failure} from "@/modules/core/common/failure";

export default function TodoProvider({children}: { children?: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Todo[]>([]);
    const [error, setError] = useState<Failure | null>(null);

    return <TodoContext.Provider value={{loading, data, error, setLoading, setError, setData}}>
        {children}
    </TodoContext.Provider>
}
