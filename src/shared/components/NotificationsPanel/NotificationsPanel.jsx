import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";
import styles from "./NotificationsPanel.module.css";

const NotificationsPanel = ({ isOpen, onClose }) => {
  // if (!isOpen) return null;

  return (
    <DropdownPanel isOpen={isOpen} onClose={onClose} title="Notifications">
      <p className={styles.subheading}>New</p>

      <ul className={styles.list}>
        <li className={styles.notification}>
          <img
            src="/sidebar/icon-no-profile.svg"
            alt="avatar"
            className={styles.avatar}
          />

          <div className={styles.text}>
            <span className={styles.username}>Username</span> liked your post.
            <span className={styles.time}>Just now</span>
          </div>

          <img
            src="/no-post-thumb.jpg"
            alt="thumb"
            className={styles.thumb}
          />
        </li>

        <li className={styles.notification}>
          <img
            src="/sidebar/icon-no-profile.svg"
            alt="avatar"
            className={styles.avatar}
          />

          <div className={styles.text}>
            <span className={styles.username}>Username</span> commented on your post.
            <span className={styles.time}>1h ago</span>
          </div>

          <img
            src="/no-post-thumb.jpg"
            alt="thumb"
            className={styles.thumb}
          />
        </li>
      </ul>
    </DropdownPanel>
  );
};

export default NotificationsPanel;
