import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import SignupForm from "./SignupForm/SignupForm";
import { registerUser } from "../../redux/auth/authOperations";
import { selectAuthRequest } from "../../redux/auth/authSelectors";

import styles from "./Signup.module.css";

const Signup = () => {
  const { loading, error, isRegisterSuccess } = useSelector(selectAuthRequest);
  // const { error, loading, isRegisterSuccess } = useSelector(selectAuthRequest);

  const dispatch = useDispatch();
  
  const onRegister = async (payload) => {
    dispatch(registerUser(payload));
  };

  if (isRegisterSuccess) return <Navigate to="/login"/>;

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.card}>
          <img src="/logo.svg" alt="ICHGRAM logo" className={styles.logo} />
          <p className={styles.subtitle}>
            Sign up to see photos and videos<br></br>from your friends.
          </p>
          <SignupForm
            requestErrors={error}
            isSubmitSuccess={isRegisterSuccess}
            submitForm={onRegister}
          />
          {loading && <p>Register request...</p>}
        </div>

        <div className={styles.signupCard}>
          <p>Have an account? </p>
          <a href="/login" className={styles.signupText}>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;


