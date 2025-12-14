import { Link, useLocation } from "react-router-dom";
import styles from "./ProfilePosts.module.css";

// Фейковые посты для демонстрации
const mockPosts = [
  { _id: "1", imageUrl: "https://picsum.photos/id/1011/300/300" },
  { _id: "2", imageUrl: "https://picsum.photos/id/1015/300/300" },
  { _id: "3", imageUrl: "https://picsum.photos/id/1016/300/300" },
  { _id: "4", imageUrl: "https://picsum.photos/id/1020/300/300" },
  { _id: "5", imageUrl: "https://picsum.photos/id/1024/300/300" },
  { _id: "6", imageUrl: "https://picsum.photos/id/1025/300/300" },
];

export default function ProfilePosts({ posts = mockPosts }) {
  const location = useLocation();

  if (!posts || posts.length === 0) {
    return <p>У пользователя пока нет постов</p>;
  }

  return (
    <div className={styles.postGrid}>
      {posts.map((post) => (
        <div key={post._id} className={styles.postItem}>
          <Link
            to={`/posts/${post._id}`}
            state={{ background: location }}
          >
            <img src={post.imageUrl} alt="Post" />
          </Link>
        </div>
      ))}
    </div>
  );
}
