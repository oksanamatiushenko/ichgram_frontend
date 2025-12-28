import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSelectors";
import { getUserByUsername } from "../../../shared/api/profile-api";
import { useFollow } from "../../../shared/hooks/useFollow";
import instance from "../../api/instance";

import GradientAvatar from "../../../layouts/GradientAvatar/GradientAvatar";
import Button from "../../../shared/components/Button/Button";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import SpinnerTextLoader from "../SpinnerTextLoader/SpinnerTextLoader";

import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const currentUser = useSelector(selectUser);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  const { isFollowing, handleFollowToggle, isProcessing } = useFollow(
    user,
    setUser
  );

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;

      setLoading(true);
      setError("");

      try {
        const fetchedUser = await getUserByUsername(username);

        setUser({
          ...fetchedUser,
          followers: fetchedUser.followers || [],
          following: fetchedUser.following || [],
          posts: fetchedUser.posts || [],
        });
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.status === 404
            ? "User not found"
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await instance.get(`/posts/${username}/posts`);
      setPosts(data.data);
    };

    fetchPosts();
  }, [username]);

  const handleMessage = () => {
    if (!user) return;
    navigate(`/messages`, { state: { userId: user._id } });
  };

  if (loading) return <SpinnerTextLoader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p>No data</p>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <GradientAvatar src={user.avatarUrl} size={168} />

        <div className={styles.profileInfo}>
          <div className={styles.topRow}>
            <h2>{user.username}</h2>

            {isOwnProfile ? (
              <button
                className={styles.editBtn}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <Button
                  className={`${styles.followBtn} ${
                    isFollowing ? styles.unfollow : styles.follow
                  }`}
                  onClick={handleFollowToggle}
                  disabled={isProcessing}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button color="secondary" onClick={handleMessage}>
                  Message
                </Button>
              </>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>{posts.length}</p>
              <p>posts</p>
            </div>

            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>{user.followers?.length || 0}</p>
              <p>followers</p>
            </div>

            <div className={styles.userInfo}>
              <p className={styles.boldNumber}>{user.following?.length || 0}</p>
              <p>following</p>
            </div>
          </div>

          <div className={styles.bio}>
            <strong>{user.fullname || "Full Name"}</strong>
            <p>{user.bio || "Bio not available"}</p>

            {user.link && (
              <a href={user.link} target="_blank" rel="noopener noreferrer">
                {user.link}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.posts}>
        <ProfilePosts posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
