import TodoLayout from "@/modules/todo/presentation/layout";
import styles from './styles/todo.module.css';
import OrganismTodoListSection from "@/modules/todo/presentation/components/organisms/todoListSection";

export default function TodoPage() {
    return <TodoLayout>
        <main className={styles.main}>
            <OrganismTodoListSection />
        </main>
    </TodoLayout>
}
