import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
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

export default Loader;
