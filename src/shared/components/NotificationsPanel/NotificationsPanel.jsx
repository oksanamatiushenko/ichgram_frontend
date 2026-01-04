import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";
import styles from "./NotificationsPanel.module.css";
import { getNotifications } from "../../api/notifications-api";

const API_ORIGIN = import.meta.env.VITE_API_URL.replace("/api", "");
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000"; // порт сервера с сокетом

const NotificationsPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== Socket.IO ===== */
  useEffect(() => {
    if (!token) return;

    let userId;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // простой JWT decode
      userId = decoded.id || decoded._id;
    } catch (e) {
      console.error("Invalid token", e);
      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join", userId); // присоединяем пользователя в комнату
    });

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => {
        if (prev.some((n) => n._id === notification._id)) return prev;
        return [notification, ...prev];
      });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  /* ===== Fetch notifications ===== */
  useEffect(() => {
    if (!isOpen || !token) return;

    getNotifications(token)
      .then((data) => {
        const normalized = data.map((n) => ({
          ...n,
          post: typeof n.post === "string" ? { _id: n.post, imageUrl: "" } : n.post,
        }));

        const unique = Array.from(new Map(normalized.map((n) => [n._id, n])).values());
        setNotifications(unique);
      })
      .catch((err) => console.error("Failed to fetch notifications:", err));
  }, [isOpen, token]);
  

  if (!isOpen) return null;

  const handleGoToUser = (username) => {
    if (!username) return;
    onClose();
    navigate(`/users/${username}`);
  };

  const handleGoToPost = (postId) => {
    if (!postId) return;
    onClose();
    navigate(`/posts/${postId}`, { state: { background: location } });
  };

  const renderText = (type) => {
    switch (type) {
      case "like": return "liked your post.";
      case "comment": return "commented on your post.";
      case "follow": return "started following you.";
      case "likeOnComment": return "liked your comment.";
      default: return "";
    }
  };

  return (
    <DropdownPanel isOpen={isOpen} onClose={onClose} title="Notifications">
      {notifications.length === 0 ? (
        <p className={styles.subheading}>No new notifications</p>
      ) : (
        <>
          <p className={styles.subheading}>New</p>
          <ul className={styles.list}>
            {notifications.map((n) => (
              <li key={n._id} className={styles.notification}>
                <img
                  onClick={() => n.sender?.username && handleGoToUser(n.sender.username)}
                  src={n.sender?.avatarUrl ? `${API_ORIGIN}${n.sender.avatarUrl}` : "/sidebar/icon-no-profile.svg"}
                  alt="avatar"
                  className={styles.avatar}
                  style={{ cursor: "pointer" }}
                />
                <div className={styles.text}>
                  <span className={styles.username}>{n.sender?.username || "User"}</span>{" "}
                  {renderText(n.type)}
                  <span className={styles.time}>{new Date(n.createdAt).toLocaleString()}</span>
                </div>
                {n.post?._id && (
                  <img
                    onClick={() => handleGoToPost(n.post._id)}
                    src={n.post?.imageUrl ? `${API_ORIGIN}${n.post.imageUrl}` : "/no-post-thumb.jpg"}
                    alt="thumb"
                    className={styles.thumb}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </DropdownPanel>
  );
};

export default NotificationsPanel;


// import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";
// import styles from "./NotificationsPanel.module.css";

// const NotificationsPanel = ({ isOpen, onClose }) => {
//   // if (!isOpen) return null;

//   return (
//     <DropdownPanel isOpen={isOpen} onClose={onClose} title="Notifications">
//       <p className={styles.subheading}>New</p>

//       <ul className={styles.list}>
//         <li className={styles.notification}>
//           <img
//             src="/sidebar/icon-no-profile.svg"
//             alt="avatar"
//             className={styles.avatar}
//           />

//           <div className={styles.text}>
//             <span className={styles.username}>Username</span> liked your post.
//             <span className={styles.time}>Just now</span>
//           </div>

//           <img
//             src="/no-post-thumb.jpg"
//             alt="thumb"
//             className={styles.thumb}
//           />
//         </li>

//         <li className={styles.notification}>
//           <img
//             src="/sidebar/icon-no-profile.svg"
//             alt="avatar"
//             className={styles.avatar}
//           />

//           <div className={styles.text}>
//             <span className={styles.username}>Username</span> commented on your post.
//             <span className={styles.time}>1h ago</span>
//           </div>

//           <img
//             src="/no-post-thumb.jpg"
//             alt="thumb"
//             className={styles.thumb}
//           />
//         </li>
//       </ul>
//     </DropdownPanel>
//   );
// };

// export default NotificationsPanel;
