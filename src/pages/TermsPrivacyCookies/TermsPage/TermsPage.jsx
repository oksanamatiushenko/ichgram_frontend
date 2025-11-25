import React from "react";
import styles from "./TermsPage.module.css";

const TermsPage = () => {
  return (
    <div className={styles.container}>
      <h1>Terms of Service</h1>

      <section>
        <h2>1. Using Our Service</h2>
        <p>
          By using our platform, you agree to follow these rules and guidelines.
        </p>
      </section>

      <section>
        <h2>2. Your Responsibilities</h2>
        <p>
          Use the service respectfully, avoid harming others, and comply with
          applicable laws.
        </p>
      </section>

      <section>
        <h2>3. Updates to Terms</h2>
        <p>
          We may update these terms periodically. Continuing to use the platform
          means you accept the changes.
        </p>
      </section>

      <section>
        <h2>4. Account Safety</h2>
        <p>
          You are responsible for keeping your account secure and for all
          activity under it.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
