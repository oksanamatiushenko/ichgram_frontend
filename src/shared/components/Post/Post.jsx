import { Link, useLocation } from "react-router-dom";
import styles from "./Post.module.css";

export default function Post({ post }) {
  const location = useLocation();

  const dateLabel = "2 weeks";
  const likesCount = post.likes.length.toLocaleString();

  return (
    <div className={styles.post}>
      {/* HEADER */}
      <div className={styles.header}>
        <img src="/itcareerhub.png" className={styles.avatar} />
        <div className={styles.headerInfo}>
          <strong>{post.author.username}</strong>
          <span className={styles.dot}> • </span>
          <span className={styles.date}>{dateLabel}</span>

          <span className={styles.dot}> • </span>
          <button className={styles.follow}>follow</button>
        </div>
      </div>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <Link to={`/posts/${post._id}`} state={{ background: location }}>
          <img
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop"
            alt="Post"
          />
        </Link>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <img src="/like-icon.svg" className={styles.icon} />
        <img src="/comment-icon.svg" className={styles.icon} />
      </div>

      {/* LIKES */}
      <div className={styles.likes}>{likesCount} likes</div>

      {/* CAPTION */}
      <div className={styles.caption}>
        <strong>{post.author.username}</strong> {post.caption}
      </div>

      {/* FIRST COMMENT */}
      {post.comments.length > 0 && (
        <div className={styles.firstComment}>
          <strong>{post.comments[0].author.username}</strong>{" "}
          {post.comments[0].text}
        </div>
      )}

      {/* COMMENT COUNT */}
      <div className={styles.viewComments}>
        View all comments ({post.comments.length})
      </div>
    </div>
  );
}
