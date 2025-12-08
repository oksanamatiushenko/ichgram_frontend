import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/auth/authSelectors";

import Navigation from "./pages/Navigation";
import Footer from "./shared/components/Footer/Footer";
import SidebarMenu from "./shared/components/Sidebar/SidebarMenu";
import NotificationsPanel from "./shared/components/NotificationsPanel/NotificationsPanel";
import Search from "./shared/components/Search/Search";
import "./styles/index.css";

function App() {
  const [openPanel, setOpenPanel] = useState(null);
  const user = useSelector(selectUser);

  const togglePanel = (panel) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="app-wrapper">
      {user && (
        <SidebarMenu
          onToggleNotifications={() => togglePanel("notifications")}
          onToggleSearch={() => togglePanel("search")}
          onClosePanels={() => setOpenPanel(null)}
          activePanel={openPanel}
        />
      )}

      {user && (
        <NotificationsPanel
          isOpen={openPanel === "notifications"}
          onClose={() => setOpenPanel(null)}
          token={user?.accessToken}
        />
      )}

      {user && (
        <Search
          isOpen={openPanel === "search"}
          onClose={() => setOpenPanel(null)}
        />
      )}

      <div className="main-content">
        <Navigation />
      </div>

      {user && <Footer />}
    </div>
  );
}

export default App;
