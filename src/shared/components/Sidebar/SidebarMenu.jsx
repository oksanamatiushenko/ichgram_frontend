import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/auth/authOperations";
import { selectUser } from "../../../redux/auth/authSelectors";
import styles from "./SidebarMenu.module.css";

const API_URL = import.meta.env.VITE_API_URL || "";

const SidebarMenu = ({
  onToggleNotifications,
  onToggleSearch,
  onClosePanels,
  activePanel,
  onOpenCreate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);

  const currentUser = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getImageSrc = (url) => {
    if (!url) return "/icon-no-profile.svg";
    return url.startsWith("http") ? url : `${API_URL}${url}`;
  };

  const menuItems = [
    { label: "Home", icon: "/sidebar/icon-home.svg", iconFilled: "/sidebar/icon-home-filled.svg" },
    { label: "Search", icon: "/sidebar/icon-search.svg", iconFilled: "/sidebar/icon-search-filled.svg" },
    { label: "Explore", icon: "/sidebar/icon-explore.svg", iconFilled: "/sidebar/icon-explore-filled.svg" },
    { label: "Messages", icon: "/sidebar/icon-messages.svg", iconFilled: "/sidebar/icon-messages-filled.svg" },
    { label: "Notification", icon: "/sidebar/icon-notification.svg", iconFilled: "/sidebar/icon-notification-filled.svg" },
    { label: "Create", icon: "/sidebar/icon-createpost.svg", iconFilled: "/sidebar/icon-createpost.svg" },
    {
      label: "Profile",
      icon: "/icon-no-profile.svg",
      iconFilled: "/icon-no-profile.svg",
      isAvatar: true,
      path: currentUser ? `/users/${currentUser.username}` : undefined,
    },
    { label: "Logout", icon: "/sidebar/icon-logout.svg", iconFilled: "/sidebar/icon-logout-filled.svg" },
  ];

  const handleClick = async (item, e) => {
    e.preventDefault();

    switch (item.label) {
      case "Home":
        navigate("/");
        onClosePanels?.();
        break;

      case "Profile":
        if (!currentUser?.username) return;
        navigate(`/users/${currentUser.username}`);
        onClosePanels?.();
        break;

      case "Explore":
        navigate("/explore");
        onClosePanels?.();
        break;

      case "Search":
        onToggleSearch?.();
        break;

      case "Notification":
        onToggleNotifications?.();
        break;

      case "Messages":
        navigate("/messages");
        break;

      case "Create":
        onOpenCreate?.();
        break;

      case "Logout":
        await handleLogout();
        break;

      default:
        onClosePanels?.();
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <img src="/logo.svg" alt="ICHGRAM" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isHovered = hoveredItem === item.label;
          const isActive = activePanel?.toLowerCase() === item.label.toLowerCase();

          const imgSrc = item.isAvatar
            ? getImageSrc(currentUser?.avatarUrl) 
            : isActive || isHovered
            ? item.iconFilled
            : item.icon;

          return (
            <a
              href="#"
              key={item.label}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={(e) => handleClick(item, e)}
            >
              <img
                src={imgSrc}
                alt={item.label}
                className={item.isAvatar ? styles.avatarIcon : styles.icon}
              />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarMenu;
