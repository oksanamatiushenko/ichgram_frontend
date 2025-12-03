import { useState } from "react";
import Navigation from "./pages/Navigation";
import Footer from "./shared/components/Footer/Footer";
import SidebarMenu from "./shared/components/Sidebar/SidebarMenu";
import NotificationsPanel from "./shared/components/NotificationsPanel/NotificationsPanel";
import Search from "./shared/components/Search/Search"
import './styles/index.css';

function App() {
    const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (panel) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };
  return (
    <div className="app-wrapper">

      <SidebarMenu
        onToggleNotifications={() => togglePanel("notifications")}
        onToggleSearch={() => togglePanel("search")}
        onClosePanels={() => setOpenPanel(null)}
        activePanel={openPanel}
      />

      <NotificationsPanel
        isOpen={openPanel === "notifications"}
        onClose={() => setOpenPanel(null)}
        token={null}
      />

      <Search
        isOpen={openPanel === "search"}
        onClose={() => setOpenPanel(null)}
      />

      <div className="main-content">
        <Navigation />
      </div>
      <Footer />
    </div>
  );
}

export default App;



