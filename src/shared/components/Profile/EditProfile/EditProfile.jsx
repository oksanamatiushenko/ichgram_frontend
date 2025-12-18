import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../../redux/auth/authSlice";
import Button from "../../Button/Button";
import { updateUserProfile } from "../../../api/profile-api";
import styles from "./EditProfile.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);

  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/icon-no-profile.svg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    setFullname(currentUser.fullname || "");
    setBio(currentUser.bio || "");
    setLink(currentUser.link || "");
    setAvatarPreview(
      currentUser.avatarUrl
        ? `${API_URL}${currentUser.avatarUrl}`
        : "/icon-no-profile.svg"
    );
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!currentUser) return;

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("bio", bio);
    formData.append("link", link);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      setLoading(true);

      const updatedUser = await updateUserProfile(currentUser.username, formData);

      // Обновляем Redux, чтобы новая ава была актуальна
      dispatch(
        setCredentials({
          user: updatedUser,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        })
      );
      
      setAvatarPreview(
        updatedUser.avatarUrl
          ? `${API_URL}${updatedUser.avatarUrl}`
          : "/icon-no-profile.svg"
      );
      navigate(`/users/${currentUser.username}`);
    } catch (err) {
      console.error("Ошибка при сохранении профиля:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editPage}>
      <h2>Edit Profile</h2>

      <div className={styles.avatarPreviewBox}>
        <div className={styles.userInfoBox}>
          <label htmlFor="avatar-upload" className={styles.avatarLabel}>
            <img
              src={avatarPreview}
              alt="avatar preview"
              className={styles.avatarImg}
            />
          </label>

          <div className={styles.userInfo}>
            <p className={styles.userFullname}>{`${currentUser.username}`}</p>
            <p className={styles.userBio}>
              {bio || "Tell something about yourself"}
            </p>
          </div>
        </div>

        <Button type="button" color="primary" onClick={() => fileInputRef.current?.click()}>
          New photo
        </Button>

        <input
          ref={fileInputRef}
          id="avatar-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleAvatarChange}
        />
      </div>

      <div className={styles.userInfo}>
        <h3>Full name</h3>
        <input
          type="text"
          placeholder="Full name"
          className={styles.input}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className={styles.userInfo}>
        <h3>Website</h3>
        <input
          type="text"
          placeholder="Your website"
          className={styles.input}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className={styles.userInfo} style={{ position: "relative" }}>
        <h3>About</h3>
        <textarea
          placeholder="About"
          className={styles.textarea}
          maxLength={150}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className={styles.captionCounter}>{bio.length}/150</div>
      </div>

      <Button color="primary" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default EditProfile;



