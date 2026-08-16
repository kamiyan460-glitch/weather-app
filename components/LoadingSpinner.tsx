import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ label }: { label?: string }) {
  return (
    <span className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label ?? "読み込み中…"}</span>
    </span>
  );
}
