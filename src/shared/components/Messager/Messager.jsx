import styles from "./Messager.module.css";

const Messager = () => {
  return (
   <div className={styles.messagesPage}>
  
  {/* Средняя колонка – список чатов */}
  <aside className={styles.chatList}>
    <div className={styles.chatListHeader}>itcareerhub</div>

    <div className={`${styles.chatItem} ${styles.active}`}>
      <img className={styles.avatarSm} src="/itcareerhub.png" />
      <div className={styles.chatInfo}>
        <div className={styles.chatName}>nikita</div>
        <div className={styles.chatLast}>Nikita sent a message · 2 week</div>
      </div>
    </div>

    <div className={styles.chatItem}>
      <img className={styles.avatarSm} src="/itcareerhub.png" />
      <div className={styles.chatInfo}>
        <div className={styles.chatName}>sashaa</div>
        <div className={styles.chatLast}>Sasha sent a message · 2 week</div>
      </div>
    </div>
  </aside>

  {/* Правая колонка – окно чата */}
  <section className={styles.chatWindow}>

    <div className={styles.chatHeader}>
      <img className={styles.headerAvatar} src="/itcareerhub.png" />
      <div className={styles.headerTitle}>nikita</div>
    </div>

    <div className={styles.userHero}>
      <img className={styles.heroAvatar} src="/itcareerhub.png" />
      <div className={styles.heroName}>nikita</div>
      <div className={styles.heroSub}>nikita · ICHgram</div>
      <button className={styles.viewProfile}>View profile</button>
    </div>

    <div className={styles.chatDate}>Jun 26, 2024, 08:49 PM</div>

    <div className={styles.chatMessages}>
      <div className={`${styles.row} ${styles.leftRow}`}>
        <img className={styles.msgAvatar} src="/itcareerhub.png" />
        <div className={`${styles.message} ${styles.left}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>

      <div className={`${styles.row} ${styles.rightRow}`}>
        <div className={`${styles.message} ${styles.right}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>

    <div className={styles.chatInput}>
      <input type="text" placeholder="Write message" />
    </div>
  </section>
</div>

  );
};

export default Messager;