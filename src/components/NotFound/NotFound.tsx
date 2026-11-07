"use client";

import Image from "next/image";
import styles from "./NotFound.module.css";

interface NotFoundProps {
  onReset: () => void;
}

export default function NotFound({ onReset }: NotFoundProps) {
  return (
    <div className={styles.container}>
      <Image
        src="/images/not-found.jpg"
        alt="No cars found"
        width={300}
        height={220}
        className={styles.image}
      />

      <h2 className={styles.title}>No cars found</h2>

      <p className={styles.description}>
        We couldn&apos;t find any cars that match your current filters. Try
        changing your search criteria or reset the filters.
      </p>

      <button type="button" className={styles.button} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
