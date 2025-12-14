import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  // ВАЖНО: если showPassword=true → тип = text (пароль видно)
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const registerProps = register && name ? register(name, rules) : {};

  return (
    <div className={styles.field}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          {...registerProps}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eye}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};

export default TextField;


