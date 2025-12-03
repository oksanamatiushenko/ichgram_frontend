import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./Login.module.css";

const Login = () => {
  const submitForm = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="/login-image.png"
          alt="App preview"
          className={styles.previewImage}
        />
      </div>

      <div className={styles.formSection}>
        <div className={styles.card}>
          <img src="/logo.svg" alt="ICHGRAM logo" className={styles.logo} />
          <p className={styles.subtitle}>
            Log in to see your friends' photos and videos.
          </p>
          {/* Email verification message убран */}
          <LoginForm submitForm={submitForm} />
        </div>

        <div className={styles.signupCard}>
          <p>Don’t have an account?</p>
          <a href="/signup" className={styles.signupText}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
