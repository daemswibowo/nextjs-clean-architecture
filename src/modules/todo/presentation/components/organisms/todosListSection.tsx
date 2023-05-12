import MoleculeTodosList from "@/modules/todo/presentation/components/molecules/todosList";
import useTodo from "@/modules/todo/presentation/hooks/useTodo";
import {useEffect} from "react";

export default function OrganismTodosListSection() {
    const {loading, data, error, getTodos} = useTodo();

    useEffect(() => {
        getTodos().then();
    }, [])

    return <MoleculeTodosList todos={data}/>
}