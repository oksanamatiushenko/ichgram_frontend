import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLikePost } from "../../hooks/useLikePost";
import { useFollow } from "../../hooks/useFollow";
import GradientAvatar from "../../../layouts/GradientAvatar/GradientAvatar";
import { getPostById } from "../../api/post-api";
import BioWithToggle from "../../components/Profile/BioWithToggle/BioWithToggle";

import styles from "./Post.module.css";

export default function Post({ post, onPostUpdate }) {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);

  const [localPost, setLocalPost] = useState(post);
  const [localAuthor, setLocalAuthor] = useState(post.author || {});
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    setLocalPost(post);
    setLocalAuthor(post.author || {});
    setShowAllComments(false);
  }, [post]);

  const { isLiked, handleLike, handleUnlike, isProcessing } = useLikePost(
    localPost,
    (updatedPost) => {
      setLocalPost(updatedPost);
      setLocalAuthor(updatedPost.author || {});
      if (onPostUpdate) onPostUpdate(updatedPost);
    }
  );

  const { isFollowing, handleFollowToggle } = useFollow(
    localAuthor,
    setLocalAuthor
  );

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const likesCount = localPost.likes?.length || 0;

  const getImageSrc = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API_URL}${url}`;
  };

  const loadComments = async () => {
    if (commentsLoading) return;
    setCommentsLoading(true);
    try {
      const fullPost = await getPostById(localPost._id);
      setLocalPost(fullPost);
      setShowAllComments(true);
    } catch (e) {
      console.error("Ошибка загрузки комментариев", e);
    } finally {
      setCommentsLoading(false);
    }
  };

  return (
    <div className={styles.post}>
      {/* HEADER */}
      <div className={styles.header}>
        <GradientAvatar
          src={getImageSrc(localAuthor.avatarUrl)}
          size={30}
        />
        <div className={styles.authorDetails}>
          <strong>{localAuthor.username || "Unknown"}</strong>
          <span className={styles.date}>
            • {new Date(localPost.createdAt).toLocaleDateString()} •
          </span>

          {currentUser && currentUser._id !== localAuthor._id && (
            <>
              <span>•</span>
              <button
                className={styles.followBtn}
                onClick={handleFollowToggle}
                type="button"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* IMAGE → OPEN POST */}
      <div className={styles.imageWrapper}>
        <Link to={`/posts/${localPost._id}`} state={{ background: location }}>
          <img
            src={getImageSrc(localPost.imageUrl)}
            alt="Post"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button
          onClick={isLiked ? handleUnlike : handleLike}
          disabled={isProcessing}
          className={styles.iconButton}
          type="button"
        >
          <img
            src={isLiked ? "/like-filled.svg" : "/like-icon.svg"}
            alt="Like"
            className={styles.icon}
          />
        </button>

        <Link to={`/posts/${localPost._id}`} state={{ background: location }}>
          <img src="/comment-icon.svg" className={styles.icon} alt="Comments" />
        </Link>
      </div>

      <div className={styles.likes}>{likesCount.toLocaleString()} likes</div>

      {/* CAPTION */}
      {localPost.caption && (
        <div className={styles.caption}>
          <strong>{localAuthor.username || "Unknown"}</strong>{" "}
          <BioWithToggle text={localPost.caption} />
        </div>
      )}

      {/* VIEW COMMENTS */}
      {localPost.comments?.length > 0 && !showAllComments && (
        <div
          className={styles.viewAll}
          onClick={loadComments}
          style={{ cursor: commentsLoading ? "wait" : "pointer" }}
        >
          {commentsLoading
            ? "Loading comments..."
            : `View all comments (${localPost.comments.length})`}
        </div>
      )}

      {/* COMMENTS */}
      {showAllComments &&
        localPost.comments?.map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <strong>{comment.author?.username || "Unknown"}</strong>{" "}
            {comment.text}
          </div>
        ))}
    </div>
  );
}
