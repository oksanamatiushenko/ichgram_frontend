import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "./redux/auth/authSelectors";
import { getCurrentUser } from "./redux/auth/authOperations";
import { setCredentials } from "./redux/auth/authSlice";

import Navigation from "./pages/Navigation";
import Footer from "./shared/components/Footer/Footer";
import SidebarMenu from "./shared/components/Sidebar/SidebarMenu";
import NotificationsPanel from "./shared/components/NotificationsPanel/NotificationsPanel";
import Search from "./shared/components/Search/Search";
import CreatePostModal from "./shared/components/CreatePostModal/CreatePostModal";

import "./styles/index.css";

function App() {
  const [openPanel, setOpenPanel] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePanel = (panel) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      dispatch(
        setCredentials({
          accessToken,
          refreshToken,
        })
      );

      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <div className="app-wrapper">
        {user && (
          <SidebarMenu
            onToggleNotifications={() => togglePanel("notifications")}
            onToggleSearch={() => togglePanel("search")}
            onClosePanels={() => setOpenPanel(null)}
            activePanel={openPanel}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        )}

        <div className="main-content">
          <Navigation />
        </div>

        {user && (
          <Footer
            navigate={navigate}
            onToggleNotifications={() => togglePanel("notifications")}
            onToggleSearch={() => togglePanel("search")}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        )}
      </div>

      {user && (
        <>
          <NotificationsPanel
            isOpen={openPanel === "notifications"}
            onClose={() => setOpenPanel(null)}
            // token={user?.accessToken}
          />

          <Search
            isOpen={openPanel === "search"}
            onClose={() => setOpenPanel(null)}
          />

          {isCreateOpen && (
            <CreatePostModal onClose={() => setIsCreateOpen(false)} />
          )}
        </>
      )}
    </>
  );
}

export default App;
