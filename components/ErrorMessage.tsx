import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠️
      </span>
      <span>{message}</span>
    </div>
  );
}
