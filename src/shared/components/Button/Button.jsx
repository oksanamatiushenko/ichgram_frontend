import styles from "./Button.module.css"

const Button = ({children, type="button", ...props}) => {
    return (
        <button type={type} {...props} className={styles.btn}>{children}</button>
    );
};

export default Button;