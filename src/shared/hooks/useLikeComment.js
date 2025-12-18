import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { likeComment, unlikeComment, getPostById } from "../api/post-api";

export const useLikeComment = (post, setPost) => {
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isProcessing, setIsProcessing] = useState(false);

  const isCommentLiked = (comment, currentUserId) => {
    return comment.likes.some((likeUser) => {
      if (typeof likeUser === "string") {
        return likeUser === currentUserId;
      }
      return likeUser._id === currentUserId;
    });
  };

  const syncPost = useCallback(async () => {
    if (!post) return;
    try {
      const updated = await getPostById(post._id);
      if (setPost) setPost(updated);
    } catch (err) {
      console.error("Ошибка при синхронизации поста:", err);
    }
  }, [post, setPost]);

  const handleLikeComment = useCallback(
    async (commentId) => {
      if (!post || !currentUser || !token || isProcessing) return;
      setIsProcessing(true);
      try {
        await likeComment(post._id, commentId, token);
        await syncPost();
      } catch (err) {
        console.error("Ошибка при лайке комментария:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [post, currentUser, token, isProcessing, syncPost]
  );

  const handleUnlikeComment = useCallback(
    async (commentId) => {
      if (!post || !currentUser || !token || isProcessing) return;
      setIsProcessing(true);
      try {
        await unlikeComment(post._id, commentId, token);
        await syncPost();
      } catch (err) {
        console.error("Ошибка при удалении лайка комментария:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [post, currentUser, token, isProcessing, syncPost]
  );

  return {
    isCommentLiked,
    handleLikeComment,
    handleUnlikeComment,
    isProcessing,
  };
};
