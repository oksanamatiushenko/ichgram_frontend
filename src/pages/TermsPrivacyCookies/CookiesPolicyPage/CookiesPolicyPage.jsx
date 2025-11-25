import React from "react";
import styles from "./CookiesPolicyPage.module.css";

const CookiesPolicyPage = () => {
  return (
    <div className={styles.container}>
      <h1>Cookies Policy</h1>

      <section>
        <h2>1. What Cookies Are</h2>
        <p>
          Cookies are small files stored on your device that help our site
          remember your preferences and improve your experience.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies to personalize your experience, analyze site usage, and
          ensure everything works smoothly.
        </p>
      </section>

      <section>
        <h2>3. Managing Cookies</h2>
        <p>
          You can control or disable cookies through your browser settings. Some
          features may not function properly if cookies are disabled.
        </p>
      </section>
    </div>
  );
};

export default CookiesPolicyPage;
