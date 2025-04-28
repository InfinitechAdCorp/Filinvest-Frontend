import React from "react";
import styles from "./loading.module.css";

const Page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className={styles.container}>
        <div className={styles.text}>
          <span>F</span>
          <span>I</span>
          <span>L</span>
          <span>I</span>
          <span>N</span>
          <span>V</span>
          <span>E</span>
          <span>S</span>
          <span>T</span>
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default Page;
