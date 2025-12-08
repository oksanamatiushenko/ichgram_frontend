import Button from "../../Button/Button";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  return (
    <div className={styles.editPage}>
      <h2>Edit Profile</h2>

      <div className={styles.avatarPreviewBox}>
        <div className={styles.userInfoBox}>
          <label htmlFor="avatar-upload" className={styles.avatarLabel}>
            <img
              src="/itcareerhub.png"
              alt="avatar preview"
              className={styles.avatarImg}
            />
          </label>

          <div className={styles.userInfo}>
            <p className={styles.userFullname}>ichschool</p>
            <p className={styles.userBio}>
              • Гарантия помощи с трудоустройством в ведущие IT-компании
            </p>
          </div>
        </div>

        <Button type="button" color="primary">
          New photo
        </Button>

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <div className={styles.userInfo}>
        <h3>Full name</h3>
        <input type="text" placeholder="Full name" className={styles.input} />
      </div>

      <div className={styles.userInfo}>
        <h3>Website</h3>
        <input
          type="text"
          placeholder="Your website"
          className={styles.input}
        />
      </div>

      <div className={styles.userInfo} style={{ position: "relative" }}>
        <h3>About</h3>
        <textarea
          placeholder="About"
          className={styles.textarea}
          maxLength={150}
        />
        <div className={styles.captionCounter}>0/150</div>
      </div>

      <Button color="primary">Save</Button>
    </div>
  );
};

export default EditProfile;
