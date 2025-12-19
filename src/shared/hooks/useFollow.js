import { useState, useEffect } from "react";
import { followUser, unfollowUser } from "../api/profile-api";

export const useFollow = (user, setUser) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
  if (!user || !currentUserId) return;

  setIsFollowing(
    user.followers?.map(String).includes(String(currentUserId))
  );
}, [user, currentUserId]);

  const handleFollowToggle = async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      let updatedUser;
      if (isFollowing) {
        updatedUser = await unfollowUser(user._id);
      } else {
        updatedUser = await followUser(user._id);
      }
      setUser(updatedUser);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isFollowing, handleFollowToggle, isProcessing };
};


