import styles from '../../styles/todo.module.css';
import Todo from "@/modules/todo/domain/entities/todo";

type TodoListItemProps = {
    todo?: Todo;
}
export default function AtomTodoListItem (props: TodoListItemProps) {
    const {todo} = props;

    return <div className={styles.listItem}>
        <label>
            <span>{todo?.title}</span>
            <input name={'completed'} checked={todo?.completed} onChange={() => null} type="checkbox" />
        </label>
    </div>
}
