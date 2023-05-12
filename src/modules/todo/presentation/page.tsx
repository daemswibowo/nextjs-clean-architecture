import TodoLayout from "@/modules/todo/presentation/layout";
import styles from './styles/todo.module.css';
import OrganismTodosListSection from "@/modules/todo/presentation/components/organisms/todosListSection";
import TodoProvider from "@/modules/todo/presentation/providers/todo.provider";

export default function TodoPage() {
    return <TodoProvider>
        <TodoLayout>
            <main className={styles.main}>
                <OrganismTodosListSection />
            </main>
        </TodoLayout>
    </TodoProvider>
}
