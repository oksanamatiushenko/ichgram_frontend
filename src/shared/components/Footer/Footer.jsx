import styles from "./Footer.module.css";

const Footer = ({ 
  onToggleNotifications, 
  onToggleSearch, 
  onOpenCreate, 
  navigate 
}) => {
  const handleClick = (e, action) => {
    e.preventDefault(); // чтобы ссылка не перезагружала страницу
    action?.();
  };

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <a href="/" className={styles.link} onClick={(e) => handleClick(e, () => navigate("/"))}>
          Home
        </a>
        <a href="#" className={styles.link} onClick={(e) => handleClick(e, onToggleSearch)}>
          Search
        </a>
        <a href="/explore" className={styles.link} onClick={(e) => handleClick(e, () => navigate("/explore"))}>
          Explore
        </a>
        <a href="/messages" className={styles.link} onClick={(e) => handleClick(e, () => navigate("/messages"))}>
          Messages
        </a>
        <a href="#" className={styles.link} onClick={(e) => handleClick(e, onToggleNotifications)}>
          Notifications
        </a>
        <a href="#" className={styles.link} onClick={(e) => handleClick(e, onOpenCreate)}>
          Create
        </a>
      </nav>
      <p className={styles.copy}>&copy; 2025 ICHgram</p>
    </footer>
  );
};

export default Footer;


