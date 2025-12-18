import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownPanel from "../../../layouts/DropdownPanel/DropdownPanel";
import styles from "./Search.module.css";
import { searchUsers } from "../../api/profile-api";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchUsers(query);
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleUserClick = (username) => {
    onClose();
    navigate(`/users/${username}`);
  };

  return (
    <DropdownPanel isOpen={isOpen} onClose={onClose} title="Search">
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button className={styles.clearBtn} onClick={() => setQuery("")}>
            <img src="/btn-clear.svg" alt="clear" />
          </button>
        )}
      </div>

      {loading && <p className={styles.subheading}>Searching...</p>}

      {!loading && users.length > 0 && (
        <ul className={styles.list}>
          {users.map((user) => (
            <li
              key={user._id}
              className={styles.item}
              onClick={() => handleUserClick(user.username)}
            >
              <img
                src={
                  user.avatarUrl
                    ? `${BACKEND_URL}${user.avatarUrl}`
                    : "/icon-no-profile.svg"
                }
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
      )}

      {!loading && query && users.length === 0 && (
        <p className={styles.subheading}>No users found</p>
      )}
    </DropdownPanel>
  );
};

export default Search;
