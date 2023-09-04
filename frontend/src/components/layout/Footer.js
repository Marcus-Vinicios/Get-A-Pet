import styles from "./Footer.module.css";

export default function Footer() {
    const ano = new Date().getFullYear()
    return (
        <footer className={styles.footer}>
            <p>
                <span>Get A Pet</span> &copy; {ano}&reg;
            </p>
        </footer>
    );
}