import styles from '../../styles/todo.module.css';
import AtomTodoListItem from "@/modules/todo/presentation/components/atoms/todoListItem";
import Todo from "@/modules/todo/domain/entities/todo";

type TodosListProps = {
    todos: Todo[];
}
export default function MoleculeTodosList({todos}: TodosListProps) {
    return <div className={styles.listContainer}>
        {todos.map((todo) => <AtomTodoListItem key={todo.id} todo={todo} />)}
    </div>
}
