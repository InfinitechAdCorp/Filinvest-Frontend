"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const UnsubscribedPage = () => {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.heading}>You've been unsubscribed</h1>
          <p style={styles.message}>
            You have successfully unsubscribed from our newsletter. We're sorry to see you go!
          </p>
          <a href="/" style={styles.button}>Back to Home</a>
        </div>
      </div>
    );
  };
  
  export default UnsubscribedPage;
  
  const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9fafb",
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "400px",
      width: "100%",
    },
    heading: {
      fontSize: "28px",
      color: "#111827",
      marginBottom: "16px",
    },
    message: {
      fontSize: "16px",
      color: "#374151",
      marginBottom: "24px",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#0070f3",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };
  