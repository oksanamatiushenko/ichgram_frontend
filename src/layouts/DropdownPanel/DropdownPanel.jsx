import styles from "./DropdownPanel.module.css";

const DropdownPanel = ({ isOpen, onClose, title, children }) => {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose}>
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </aside>
    </div>
  );
};
export default DropdownPanel;