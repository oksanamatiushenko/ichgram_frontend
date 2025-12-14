import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SidebarMenu.module.css";
import { logoutUser } from "../../../redux/auth/authOperations";

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

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      label: "Home",
      icon: "/sidebar/icon-home.svg",
      iconFilled: "/sidebar/icon-home-filled.svg",
    },
    {
      label: "Search",
      icon: "/sidebar/icon-search.svg",
      iconFilled: "/sidebar/icon-search-filled.svg",
    },
    {
      label: "Explore",
      icon: "/sidebar/icon-explore.svg",
      iconFilled: "/sidebar/icon-explore-filled.svg",
    },
    {
      label: "Messages",
      icon: "/sidebar/icon-messages.svg",
      iconFilled: "/sidebar/icon-messages-filled.svg",
    },
    {
      label: "Notification",
      icon: "/sidebar/icon-notification.svg",
      iconFilled: "/sidebar/icon-notification-filled.svg",
    },
    {
      label: "Create",
      icon: "/sidebar/icon-createpost.svg",
      iconFilled: "/sidebar/icon-createpost.svg",
    },
    {
      label: "Profile",
      icon: "/sidebar/icon-no-profile.svg",
      iconFilled: "/sidebar/icon-no-profile.svg",
      isAvatar: true,
    },
    {
      label: "Logout",
      icon: "/sidebar/icon-logout.svg",
      iconFilled: "/sidebar/icon-logout-filled.svg",
    },
  ];

  const handleClick = async (item, e) => {
    e.preventDefault();

    switch (item.label) {
      case "Home":
        navigate("/");
        onClosePanels?.();
        break;

      case "Profile":
        navigate("/profile");
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
          const isActive =
            activePanel &&
            activePanel.toLowerCase() === item.label.toLowerCase();

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
                src={isHovered || isActive ? item.iconFilled : item.icon}
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
