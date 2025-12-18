import { useState } from "react";
import SidebarMenu from "../shared/components/Sidebar/SidebarMenu";
import CreatePostModal from "../shared/components/CreatePostModal/CreatePostModal";
import styles from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenCreate = () => setShowCreateModal(true);
  const handleCloseCreate = () => setShowCreateModal(false);

  return (
    <div className={styles.appLayout}>
      <SidebarMenu onOpenCreate={handleOpenCreate} />

      <main className={styles.mainContent}>{children}</main>

      {showCreateModal && (
        <CreatePostModal
          onClose={handleCloseCreate}
          onPostCreated={() => {
            // Здесь можно вызвать глобальный state или событие для обновления постов
          }}
        />
      )}
    </div>
  );
};

export default AppLayout;

