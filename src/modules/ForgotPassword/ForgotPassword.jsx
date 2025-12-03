import React from "react";
import TextField from "../../shared/components/TextField/TextField";
import Button from "../../shared/components/Button/Button";

import styles from "./ForgotPassword.module.css";


const ForgotPassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        
        <div className={styles.card}>
          <img src="/forgot-password.svg" alt="" />

          <p className={styles.subtitleBlack}>Trouble logging in?</p>

          <h5>
            Enter your email, phone, or username and we’ll send you a link to get back
            into your account.
          </h5>

          <form className={styles.form}>
            <TextField placeholder="Email or Username" />

            <Button type="button">Reset your password</Button>
          </form>

          <div className={styles.separatorContainer}>
            <div className={styles.separator}></div>
            <span className={styles.orText}>OR</span>
            <div className={styles.separator}></div>
          </div>

          <div className={styles.linkWithoutBorder}>
            <a href="/signup" className={styles.backToLoginLink}>
              Create new account
            </a>
          </div>
        </div>

        <div className={styles.backToLogin}>
          <a href="/login" className={styles.backToLoginLink}>
            Back to login
          </a>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;