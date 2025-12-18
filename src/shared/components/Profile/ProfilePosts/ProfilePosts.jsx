import { Link, useLocation } from "react-router-dom";
import styles from "./ProfilePosts.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePosts({ posts = [] }) {
  const location = useLocation();
  //console.log("PROFILE POSTS:", posts);

  if (!posts.length) {
    return <p>У пользователя пока нет постов</p>;
  }

  return (
    <div className={styles.postGrid}>
      {posts.map((post) => (
        <div key={post._id} className={styles.postItem}>
          <Link to={`/posts/${post._id}`} state={{ background: location }}>
            <img
              src={`${API_URL}${post.imageUrl}`}
              alt="Post"
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}


