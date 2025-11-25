import React from "react";
import { useId } from "react";
import styles from "./TextField.module.css";

const TextField = ({label, register, name, rules, type="text", error, ...props}) => {
  const id = useId();

  return (
    <div>
        {label && <label htmlFor={id} className={styles.label}>{label}</label>}
        <input {...register(name, rules)} type={type} {...props} id={id} className={styles.input}/>
        {error && <p className={styles.inputError}>{error.message}</p>}
    </div>
  );
};

export default TextField;
