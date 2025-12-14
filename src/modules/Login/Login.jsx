import { useSelector, useDispatch } from "react-redux";

import LoginForm from "./LoginForm/LoginForm";
import { selectAuthRequest } from "../../redux/auth/authSelectors";

import styles from "./Login.module.css";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/authOperations";

const Login = () => {
  const { loading, error, isLoginSuccess } = useSelector(selectAuthRequest);
  const dispatch = useDispatch();
  const onLogin = async (payload) => {
    dispatch(loginUser(payload));
  };
  
  if (isLoginSuccess) return <Navigate to="/" />;

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
            Log in to continue.
          </p>

          <LoginForm submitForm={onLogin} requestErrors={error} />
          {loading && <p>Login request...</p>}
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
