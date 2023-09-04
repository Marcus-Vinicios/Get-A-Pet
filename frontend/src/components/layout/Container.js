import styles from "./Container.module.css";

export default function Container({children}) {
    return (
        <main className={styles.container}>
            {children}
        </main>
    );
}