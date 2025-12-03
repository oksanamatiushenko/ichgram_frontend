import { useEffect, useState } from "react";
import styles from "./Explore.module.css";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Моковые посты для верстки
    const mockPosts = [
      { _id: "1", imageUrl: "https://picsum.photos/300?1" },
      { _id: "2", imageUrl: "https://picsum.photos/300?2" },
      { _id: "3", imageUrl: "https://picsum.photos/300?3" },
      { _id: "4", imageUrl: "https://picsum.photos/300?4" },
      { _id: "5", imageUrl: "https://picsum.photos/300?5" },
      { _id: "6", imageUrl: "https://picsum.photos/300?6" },
      { _id: "7", imageUrl: "https://picsum.photos/300?7" },
      { _id: "8", imageUrl: "https://picsum.photos/300?8" },
      { _id: "9", imageUrl: "https://picsum.photos/300?9" },
      { _id: "10", imageUrl: "https://picsum.photos/300?10" },
      { _id: "11", imageUrl: "https://picsum.photos/300?11" },
      { _id: "12", imageUrl: "https://picsum.photos/300?12" },
      { _id: "13", imageUrl: "https://picsum.photos/300?13" },
    ];
  Promise.resolve().then(() => {
    setPosts(mockPosts);
  });
}, []);

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <div
          key={post._id}
          className={index % 3 === 2 ? styles.itemWide : styles.itemSquare}
        >
          <img src={post.imageUrl} alt="post" className={styles.postImage} />
        </div>
      ))}
    </div>
  );
};

export default Explore;





