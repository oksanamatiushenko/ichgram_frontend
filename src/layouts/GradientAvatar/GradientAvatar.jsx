import styles from "./GradientAvatar.module.css";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const FALLBACK_AVATAR = "/icon-no-profile.svg";

const GradientAvatar = ({ src, size = 60, alt = "avatar" }) => {
  const validSrc =
    src && src.trim() !== ""
      ? src.startsWith("/uploads")
        ? `${BACKEND_URL}${src}`
        : src
      : FALLBACK_AVATAR;

  const borderWidth = Math.max(Math.floor(size * 0.01), 2); // градиент
  const spacerWidth = Math.max(Math.floor(size * 0.02), 2); // белая прослойка
  const innerSize = size - borderWidth * 2;
  const imageSize = innerSize - spacerWidth * 2;

  return (
    <div
      className={styles.avatarWrapper}
      style={{
        width: size,
        height: size,
        padding: borderWidth,
      }}
    >
      <div
        className={styles.avatarInner}
        style={{
          width: innerSize,
          height: innerSize,
          padding: spacerWidth,
        }}
      >
        <img
          src={validSrc}
          alt={alt}
          className={styles.avatarImage}
          style={{
            width: imageSize,
            height: imageSize,
          }}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_AVATAR;
          }}
        />
      </div>
    </div>
  );
};

export default GradientAvatar;


