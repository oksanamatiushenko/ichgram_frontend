import styles from "./GradientAvatar.module.css";

const GradientAvatar = ({ src, size = 60, alt = "avatar" }) => {
  
  return (
    <div
      className={styles.avatarWrapper}
      style={{
        width: size,
        height: size
      }}
    >
      <div className={styles.avatarInner}>
        <img
          src={src}
          alt={alt}
          className={styles.avatarImage}
        />
      </div>
    </div>
  );
};

export default GradientAvatar;
