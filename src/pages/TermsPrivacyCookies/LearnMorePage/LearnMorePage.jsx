import styles from "./LearnMorePage.module.css";

const LearnMorePage = () => {
  return (
    <div className={styles.container}>
      <h1>Learn More About Our Platform</h1>

      <section>
        <h2>1. What We Offer</h2>
        <p>
          Our platform provides tools to connect, share, and explore content
          easily.
        </p>
      </section>

      <section>
        <h2>2. Getting Started</h2>
        <p>
          Sign up, customize your profile, and start interacting with the
          community.
        </p>
      </section>

      <section>
        <h2>3. Tips & Tutorials</h2>
        <p>
          Explore our guides to make the most of our features and discover
          hidden tips.
        </p>
      </section>

      <section>
        <h2>4. Stay Updated</h2>
        <p>
          Keep an eye on new features and updates to improve your experience.
        </p>
      </section>
    </div>
  );
};

export default LearnMorePage;
