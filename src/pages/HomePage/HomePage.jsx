import Post from "../../shared/components/Post/Post";

import styles from "./HomePage.module.css";

const fakePosts = [
  {
    _id: "1",
    author: {
      _id: "u1",
      username: "sashaa",
      avatarUrl: "/avatar1.png",
    },
    createdAt: "2025-02-01T12:00:00",
    imageUrl: "/demo-post.jpg",
    caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    likes: ["u2", "u3", "u4"],
    comments: [
      { _id: "c1", author: { username: "heyyyy" }, text: "IM… more" },
    ],
  },
  {
    _id: "2",
    author: {
      _id: "u1",
      username: "sashaa",
      avatarUrl: "/avatar1.png",
    },
    createdAt: "2025-02-01T12:00:00",
    imageUrl: "/demo-post.jpg",
    caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    likes: ["u2", "u3", "u4"],
    comments: [
      { _id: "c1", author: { username: "heyyyy" }, text: "IM… more" },
    ],
  },
  {
    _id: "3",
    author: {
      _id: "u1",
      username: "sashaa",
      avatarUrl: "/avatar1.png",
    },
    createdAt: "2025-02-01T12:00:00",
    imageUrl: "/demo-post.jpg",
    caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    likes: ["u2", "u3", "u4"],
    comments: [
      { _id: "c1", author: { username: "heyyyy" }, text: "IM… more" },
    ],
  },
  {
    _id: "4",
    author: {
      _id: "u1",
      username: "sashaa",
      avatarUrl: "/avatar1.png",
    },
    createdAt: "2025-02-01T12:00:00",
    imageUrl: "/demo-post.jpg",
    caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    likes: ["u2", "u3", "u4"],
    comments: [
      { _id: "c1", author: { username: "heyyyy" }, text: "IM… more" },
    ],
  },
];


export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.feed}>
        {fakePosts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

        <div className={styles.end}>
          <img src="/refresh-light.svg" />
          <p>You’ve seen all the updates</p>
          <span>You have viewed all new publications</span>
        </div>
      </div>
    </div>
  );
}
