import React, { useId } from "react";
import styles from "./TextField.module.css";

const TextField = ({ 
  label,
  register,
  name,
  rules,
  type = "text",
  error,
  ...props 
}) => {
  const id = useId();

  const registerProps = register && name ? register(name, rules) : {};

  return (
    <div>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}

      <input
        id={id}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...registerProps}
        {...props}
      />

      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};

export default TextField;

