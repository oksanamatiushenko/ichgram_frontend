import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { isToday, isYesterday, differenceInDays } from "date-fns";
import { useSelector } from "react-redux";

import { getPostById, addCommentToPost } from "../../api/post-api";
import GradientAvatar from "../../../layouts/GradientAvatar/GradientAvatar";
import PostComments from "./PostComments/PostComments";
import EmojiPickerButton from "../../../layouts/EmojiButton/EmojiButton";
import PostActionsModal from "./PostActionsModal/PostActionsModal";
import EditPostModal from "../EditPostModal/EditPostModal";

import styles from "./SinglePost.module.css";
import { useFollow } from "../../hooks/useFollow";
import { useLikePost } from "../../hooks/useLikePost";
import { useLikeComment } from "../../hooks/useLikeComment";


const getDateLabel = (createdAt) => {
  const date = new Date(createdAt);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  const daysAgo = differenceInDays(new Date(), date);
  return `${daysAgo} ${daysAgo === 1 ? "Day" : "Days"}`;
};

const SinglePost = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [commentText, setCommentText] = useState("");

  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const textareaRef = useRef(null);

  const { isFollowing, handleFollow, handleUnfollow } = useFollow(
    author,
    setAuthor
  );

  const {
    isLiked,
    handleLike,
    handleUnlike,
    isProcessing: isPostProcessing,
  } = useLikePost(post, setPost);

  const {
    isCommentLiked,
    handleLikeComment,
    handleUnlikeComment,
    isProcessing: isCommentProcessing,
  } = useLikeComment(post, setPost);

  /* ===== fetch post ===== */
  const fetchPost = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await getPostById(id);
      setPost(data);
      setAuthor(data.author);
      setError(null);
    } catch (err) {
      console.error("Ошибка при получении поста:", err);
      setError("Ошибка при загрузке поста");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchPost();

    return () => {
      document.body.style.overflow = "";
    };
  }, [fetchPost]);

  /* ===== emoji ===== */
  const handleEmojiInsert = (emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const updated =
      commentText.slice(0, start) +
      emoji +
      commentText.slice(end);

    setCommentText(updated);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + emoji.length;
    });
  };

  /* ===== add comment ===== */
  const handleAddComment = async () => {
    if (!commentText.trim() || !currentUser || !post || !token) return;

    try {
      const newComment = await addCommentToPost(
        post._id,
        commentText.trim(),
        token
      );

      setPost((prev) =>
        prev
          ? { ...prev, comments: [...(prev.comments || []), newComment] }
          : prev
      );

      setCommentText("");
    } catch (err) {
      console.error("Ошибка добавления комментария", err);
    }
  };

  const onClose = () => navigate(-1);

  /* ===== states ===== */
  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>Загрузка...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <p>{error || "Пост не найден"}</p>
          <button className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  /* ===== render ===== */
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className={styles.photoSection}>
          <img src={post.imageUrl} alt="Post" className={styles.photo} />
        </div>

        {/* INFO */}
        <div className={styles.infoSection}>
          <div className={styles.scrollableContent}>
            {author && (
              <div className={styles.authorInfo}>
                <Link to={`/users/${author.username}`}>
                  <GradientAvatar
                    src={author.avatarUrl || "/no-profile-pic-icon-11.jpg"}
                    size={28}
                  />
                </Link>

                <Link to={`/users/${author.username}`}>
                  <strong>{author.username}</strong>
                </Link>

                {currentUser && currentUser._id !== author._id && (
                  <>
                    <span>•</span>
                    <button
                      className={styles.followBtn}
                      onClick={
                        isFollowing ? handleUnfollow : handleFollow
                      }
                    >
                      {isFollowing ? "Отписаться" : "Подписаться"}
                    </button>
                  </>
                )}

                {currentUser && currentUser._id === author._id && (
                  <button
                    onClick={() => setShowActions(true)}
                    className={styles.moreBtn}
                  >
                    <img src="/more-actions-btn.svg" alt="More" />
                  </button>
                )}
              </div>
            )}

            {/* CAPTION */}
            {author && (
              <div className={styles.authorInfoShort}>
                <GradientAvatar
                  src={author.avatarUrl || "/no-profile-pic-icon-11.jpg"}
                  size={28}
                />
                <p>
                  <strong>{author.username}</strong>{" "}
                  {post.caption || "Без описания"}
                </p>
              </div>
            )}

            {/* COMMENTS */}
            <PostComments
              comments={post.comments || []}
              currentUser={currentUser}
              likedCommentsIds={
                post.comments
                  ?.filter((c) =>
                    isCommentLiked(c, currentUser?._id)
                  )
                  .map((c) => c._id) || []
              }
              onLikeComment={handleLikeComment}
              onUnlikeComment={handleUnlikeComment}
            />
          </div>

          {/* BOTTOM */}
          <div className={styles.bottomBar}>
            <div className={styles.actions}>
              <img
                src={isLiked ? "/like-filled.svg" : "/like-con.svg"}
                alt="Like"
                className={styles.icon}
                onClick={
                  isPostProcessing
                    ? undefined
                    : isLiked
                    ? handleUnlike
                    : handleLike
                }
              />
            </div>

            <p className={styles.likes}>{post.likes?.length || 0} лайков</p>
            <p className={styles.time}>{getDateLabel(post.createdAt)}</p>

            <form
              className={styles.commentForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
              }}
            >
              <EmojiPickerButton onSelect={handleEmojiInsert} />

              <textarea
                ref={textareaRef}
                placeholder="Add comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isCommentProcessing}
              />

              <button
                type="submit"
                disabled={!commentText.trim() || isCommentProcessing}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* MODALS */}
        {showActions && (
          <PostActionsModal
            postId={post._id}
            onClose={() => setShowActions(false)}
            onEditClick={() => {
              setShowActions(false);
              setIsEditing(true);
            }}
            onDeleted={async () => {
              setShowActions(false);
              navigate(`/users/${author?.username}`);
            }}
          />
        )}

        {isEditing && (
          <EditPostModal
            postId={post._id}
            initialCaption={post.caption || ""}
            previewUrl={post.imageUrl}
            onClose={() => setIsEditing(false)}
            onSaved={async () => {
              await fetchPost();
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePost;    