import { useState } from "react";
import { likePost, unlikePost } from "../api/post-api";

export const useLikePost = (post, setPost) => {
  const userId = localStorage.getItem("userId");
  const isLiked = post?.likes?.includes(userId);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = async () => {
    setIsProcessing(true);
    try {
      const updatedPost = await likePost(post._id);
      setPost(updatedPost);
    } catch (err) {
      console.error("Ошибка лайка:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnlike = async () => {
    setIsProcessing(true);
    try {
      const updatedPost = await unlikePost(post._id);
      setPost(updatedPost);
    } catch (err) {
      console.error("Ошибка снятия лайка:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLiked, handleLike, handleUnlike, isProcessing };
};

