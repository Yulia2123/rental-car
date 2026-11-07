import Loader from "@/components/Loader/Loader";
import styles from "./CatalogLoader.module.css";

export default function CatalogLoader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Loader size="large" className={styles.loader} />

        <h2 className={styles.title}>Loading cars...</h2>

        <p className={styles.description}>
          Please wait while we fetch the best
          <br />
          cars for you
        </p>
      </div>
    </div>
  );
}
