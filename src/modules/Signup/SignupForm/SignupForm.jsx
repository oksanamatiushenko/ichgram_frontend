import React from "react";
import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

import styles from "./SignupForm.module.css";

const SignupForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.formfields}>
        <TextField placeholder="Email" />
        <TextField placeholder="Fullname" />
        <TextField placeholder="Username" />
        <TextField placeholder="Password" type="password" />
      </div>

      <div className={styles.termsBox}>
        <p className={styles.policyText}>
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <a href="/privacy-policy" target="_blank" className={styles.link}>
            Learn More
          </a>
        </p>

        <p className={styles.policyText}>
          By signing up, you agree to our{" "}
          <a href="/terms" target="_blank" className={styles.link}>
            Terms
          </a>
          ,{" "}
          <a href="/privacy-policy" target="_blank" className={styles.link}>
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/cookies-policy" target="_blank" className={styles.link}>
            Cookies Policy
          </a>
          .
        </p>
      </div>

      <Button type="button" color="primary">Sign up</Button>
    </form>
  );
};

export default SignupForm;
