import SignupForm from "./SignupForm/SignupForm";
import styles from "./Signup.module.css";

const Signup = () => {
      return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.card}>
          <img src="/logo.svg" alt="ICHGRAM logo" className={styles.logo} />
          <p className={styles.subtitle}>
            Sign up to see photos and videos from your friends.
          </p>
          <SignupForm />
        </div>

        <div className={styles.signupCard}>
          <p>
            Have an account?{" "}
            <a href="/login" className={styles.signupText}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;