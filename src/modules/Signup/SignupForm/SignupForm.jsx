import { useEffect } from "react";
import { useForm } from "react-hook-form";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

import styles from "./SignupForm.module.css";

const SignupForm = ({ requestErrors, isSubmitSuccess, submitForm }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (requestErrors) {
      for (const key in requestErrors) {
        setError(key, {
          message: requestErrors[key],
        });
      }
    }
  }, [requestErrors, setError]);

  useEffect(() => {
    if (isSubmitSuccess) {
      reset();
    }
  }, [isSubmitSuccess, reset]);

  const onSubmit = (values) => {
    submitForm(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formfields}>
         <TextField
          register={register}
          rules={{ required: "Email is required" }}
          name="email"
          type="email"
          placeholder="Email"
          error={errors.email}
        />

        <TextField
          register={register}
          rules={{ required: "Fullname is required" }}
          name="fullname"
          placeholder="Full Name"
          error={errors.fullname}
        />

        <TextField
          register={register}
          rules={{ required: "Username is required" }}
          name="username"
          placeholder="Username"
          error={errors.username}
        />

        <TextField
          register={register}
          rules={{ required: "Password required" }}
          name="password"
          type="password"
          placeholder="Password"
          error={errors.password}
        />
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

      <Button type="submit" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
