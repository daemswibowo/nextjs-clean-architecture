import MoleculeTodosList from "@/modules/todo/presentation/components/molecules/todosList";
import styles from '@/modules/todo/presentation/styles/todo.module.css';
import {useTodoContext} from "@/modules/todo/presentation/todo.context";

export default function OrganismTodoListSection() {
    const {loading, data, fetchTodos} = useTodoContext();
    return <section className={styles.listSection}>
        <MoleculeTodosList todos={data} />
    </section>
}
