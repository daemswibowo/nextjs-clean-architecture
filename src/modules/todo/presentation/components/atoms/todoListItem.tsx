import styles from '../../styles/todo.module.css';
import Todo from "@/modules/todo/domain/entities/todo";

type TodoListItemProps = {
    todo?: Todo;
}
export default function AtomTodoListItem (props: TodoListItemProps) {
    const {todo} = props;

    return <div className={styles.listItem}>
        <label>
            <span>todo item 1</span>
            <input name={'completed'} checked={true} type="checkbox" />
        </label>
    </div>
}
