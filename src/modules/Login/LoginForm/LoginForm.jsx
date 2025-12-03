import React from "react";
import { useForm } from "react-hook-form";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (values) => {
    console.log("Submitted:", values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formfields}>
        
        {/* Identifier */}
        <TextField
          name="identifier"
          placeholder="Email or Username"
          type="text"
          register={register}
          rules={{ required: "Email or username is required" }}
          error={errors.identifier}
        />

        {/* Password */}
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          rules={{ required: "Password is required" }}
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
