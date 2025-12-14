import React from "react";
import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";
import styles from "./Search.module.css";

const sampleUsers = [
  { _id: "1", username: "nikita", fullname: "Nikita Ivanov", avatarUrl: "/itcareerhub.png" },
  { _id: "2", username: "sashaa", fullname: "Sasha Petrov", avatarUrl: "/sashaa.png" },
  { _id: "3", username: "alex", fullname: "Alex Johnson", avatarUrl: "" },
];

const Search = ({ isOpen, onClose }) => {
  return (
    <DropdownPanel isOpen={isOpen} onClose={onClose} title="Search">

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
        />

        {/* SVG-кнопка очистки справа */}
        <button className={styles.clearBtn}>
          <img src="/btn-clear.svg" alt="clear" className={styles.clearIcon} />
        </button>
      </div>

      <p className={styles.subheading}>Recent</p>

      <ul className={styles.list}>
        {sampleUsers.map(user => (
          <li key={user._id} className={styles.item}>
            <img
              src={user.avatarUrl || "/sashaa.png"}
              alt={user.username}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <p>{user.username}</p>
              <span className={styles.fullname}>{user.fullname}</span>
            </div>
          </li>
        ))}
      </ul>
    </DropdownPanel>
  );
};

export default Search;
