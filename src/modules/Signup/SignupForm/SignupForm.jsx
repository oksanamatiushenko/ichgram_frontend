import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

import styles from "./SignupForm.module.css";
import { registerSchema } from "../../../shared/schemas/auth.schemas";

const SignupForm = ({ submitForm, requestErrors, isSubmitSuccess }) => {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formfields}>
        <TextField name="email" placeholder="Email" type="email" register={register} error={errors.email} />
        <TextField name="fullname" placeholder="Full Name" register={register} error={errors.fullname} />
        <TextField name="username" placeholder="Username" register={register} error={errors.username} />
        <TextField name="password" placeholder="Password" type="password" register={register} error={errors.password} />
      </div>

      <div className={styles.termsBox}>
        <p className={styles.policyText}>
          People who use our service may have uploaded your contact information to Instagram.{" "}
          <a href="/learn-more" target="_blank" className={styles.link}>Learn More</a>
        </p>

        <p className={styles.policyText}>
          By signing up, you agree to our{" "}
          <a href="/terms" target="_blank" className={styles.link}>Terms</a>,{" "}
          <a href="/privacy-policy" target="_blank" className={styles.link}>Privacy Policy</a> and{" "}
          <a href="/cookies-policy" target="_blank" className={styles.link}>Cookies Policy</a>.
        </p>
      </div>

      <Button type="submit" color="primary">Sign up</Button>
    </form>
  );
};

export default SignupForm;
