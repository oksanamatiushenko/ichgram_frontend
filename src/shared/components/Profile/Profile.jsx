import React from "react";
import GradientAvatar from "../../../layouts/GradientAvatar/GradientAvatar";
import Button from "../../../shared/components/Button/Button";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <GradientAvatar
          src="/sidebar/icon-no-profile.svg"
          size={168}
          alt="user avatar"
        />

        <div className={styles.profileInfo}>
          <div className={styles.topRow}>
            <h2>username</h2>
            <Button color="primary">Follow</Button>
          </div>

          <div className={styles.stats}>
            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>12</p>
              <p>posts</p>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>340</p>
              <p>followers</p>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>180</p>
              <p>following</p>
            </div>
          </div>

          <div className={styles.bio}>
            <strong>Full Name</strong>
            <p>This is a static bio example.</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              example.com
            </a>
          </div>
        </div>
      </div>

      <div className={styles.posts}>
        <h3>Posts</h3>
        <div className={styles.postList}>
          <div className={styles.post}>Static post 1</div>
          <div className={styles.post}>Static post 2</div>
          <div className={styles.post}>Static post 3</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

