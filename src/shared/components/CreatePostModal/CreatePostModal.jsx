import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSelectors";
import styles from "./CreatePostModal.module.css";
import { createPost } from "../../api/post-api";
import EmojiButton from "../../../layouts/EmojiButton/EmojiButton";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const user = useSelector(selectUser);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : "/icon-no-profile.svg"
  );

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Обновляем аватар, если пользователь поменял фото
  useEffect(() => {
    setAvatarPreview(
      user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : "/icon-no-profile.svg"
    );
  }, [user?.avatarUrl]);

  // Обработка выбора изображения для поста
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Создание поста
  const handleSubmit = async () => {
    if (!imageFile) return;
    setIsSubmitting(true);
    try {
      const newPost = await createPost(imageFile, caption);
      onPostCreated?.(newPost);
      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Добавление Emoji
  const handleEmojiInsert = (emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = caption.slice(0, start);
    const after = caption.slice(end);

    const updated = before + emoji + after;
    setCaption(updated);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    });
  };

  // Закрытие по ESC
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Блокировка скролла body при открытой модалке
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src="/btn-clear.svg" alt="Close" />
          </button>
          <h3 className={styles.modalTitle}>Create new post</h3>
          <button
            className={styles.shareBtn}
            onClick={handleSubmit}
            disabled={isSubmitting || !imageFile}
          >
            {isSubmitting ? "Sharing..." : "Share"}
          </button>
        </div>

        {/* BODY */}
        <div className={styles.modal}>
          {/* LEFT — Фото */}
          <div
            className={styles.photoSection}
            onClick={() => fileInputRef.current.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className={styles.photo} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <div className={styles.imageBox}>
                  <img src="/upload-img.svg" alt="Upload" />
                </div>
                <p>Select from computer</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* RIGHT — Форма */}
          <div className={styles.infoSection}>
            <div className={styles.authorInfo}>
              <div className={styles.avatarPlaceholder}>
                <img
                  src={avatarPreview}
                  alt="user avatar"
                  className={styles.avatarImg}
                />
              </div>
              <p className={styles.username}>{user?.username || "username"}</p>
            </div>

            {/* Кнопка Emoji */}
            <EmojiButton onSelect={handleEmojiInsert} />

            <div className={styles.form}>
              <div className={styles.captionCounter}>{caption.length}/2200</div>
              <textarea
                className={styles.textarea}
                ref={textareaRef}
                placeholder="Add caption"
                value={caption}
                maxLength={2200}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
