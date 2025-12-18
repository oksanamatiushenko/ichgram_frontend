import { useEffect, useState } from "react";
import Post from "../../shared/components/Post/Post";
import instance from "../../shared/api/instance";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await instance.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Ошибка получения постов:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>No posts available</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.feed}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        <div className={styles.end}>
          <img src="/refresh-light.svg" alt="end" />
          <p>You’ve seen all the updates</p>
          <span>You have viewed all new publications</span>
        </div>
      </div>
    </div>
  );
}

