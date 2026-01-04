import { useDispatch, useSelector } from "react-redux";
import styles from "./PostActionsModal.module.css";
import { deletePost } from "../../../api/post-api";
import { setShouldReloadPosts } from "../../../../redux/posts/posts-slice";

const PostActionsModal = ({ postId, onClose, onEditClick, onDeleted }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (!token) {
        console.error("Нет accessToken");
        return;
      }

      await deletePost(postId);
      dispatch(setShouldReloadPosts(true));

      if (onDeleted) {
        await onDeleted();
      }

      onClose();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(link);
    onClose();
  };

  const handleGoToPost = () => {
    window.location.href = `/posts/${postId}`;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.danger} onClick={handleDelete}>
          Delete
        </button>
        <button onClick={onEditClick}>Edit</button>
        <button onClick={handleGoToPost}>Go to post</button>
        <button onClick={handleCopyLink}>Copy link</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PostActionsModal;
