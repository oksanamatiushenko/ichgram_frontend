import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

import styles from "./LoginForm.module.css";
import { loginSchema } from "../../../shared/schemas/auth.schemas";

const LoginForm = ({ submitForm, requestErrors, isSubmitSuccess }) => {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    if (requestErrors) {
      for (const key in requestErrors) {
        setError(key, { message: requestErrors[key] });
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formfields}>
        <TextField
          name="email"
          placeholder="Email or Username"
          type="text"
          register={register}
          error={errors.email}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password}
        />
      </div>

      <Button type="submit" color="primary">Log in</Button>

      <div className={styles.separatorContainer}>
        <div className={styles.separator}></div>
        <span className={styles.orText}>OR</span>
        <div className={styles.separator}></div>
      </div>

      <a className={styles.link} href="/forgot-password">
        Forgot password?
      </a>
    </form>
  );
};

export default LoginForm;

