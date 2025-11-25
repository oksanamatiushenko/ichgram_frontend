import React from "react";
import styles from "./PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect data you provide directly, like your account details,
          and information about how you use our site to improve your experience.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Data</h2>
        <p>
          Your information is used to provide, maintain, and enhance our
          services, and to communicate important updates.
        </p>
      </section>

      <section>
        <h2>3. Keeping Your Data Safe</h2>
        <p>
          We implement reasonable security measures to safeguard your data from
          unauthorized access.
        </p>
      </section>

      <section>
        <h2>4. Your Choices</h2>
        <p>
          You can update or delete your personal information in your account
          settings at any time.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
