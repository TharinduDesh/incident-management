import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Dashboard from "./components/dashboard/Dashboard";
import IncidentForm from "./components/Form/IncidentForm";
import ViewIncident from "./components/view/ViewIncident";
import axios from "axios";
import Calendar from "./components/calender/Calendar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [showViewIncidents, setShowViewIncidents] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const handleReportIncident = () => {
    setShowIncidentForm(true);
    setShowCalendar(false);
    setShowDashboard(false);
    closeSidebar();
  };

  const handleViewIncidents = () => {
    setShowIncidentForm(false);
    setShowViewIncidents(true);
    setShowCalendar(false);
    setShowDashboard(false);
    closeSidebar();
  };

  const handleViewCalendar = () => {
    setShowIncidentForm(false);
    setShowViewIncidents(false);
    setShowCalendar(true); // Show calendar
    setShowDashboard(false);
    closeSidebar();
  };

  const handleViewDashboard = () => {
    setShowIncidentForm(false);
    setShowViewIncidents(false);
    setShowCalendar(false);
    setShowDashboard(true); // Show dashboard
    closeSidebar();
  };

  return (
    <div className="App">
      {/* Pass openSidebar to Navbar */}
      <Navbar openSidebar={openSidebar} />{" "}
      {/* Navbar can now open the sidebar */}
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        onReportIncident={handleReportIncident} // Pass the handler to Sidebar
        onViewIncidents={handleViewIncidents}
        onViewCalendar={handleViewCalendar}
        onViewDashboard={handleViewDashboard}
      />
      {/* Main content area */}
      <div className="main-content">
        {/* Render Dashboard */}
        {showDashboard && <Dashboard />}
        {/* Display incidents or the form based on state */}
        {showIncidentForm && <IncidentForm />}{" "}
        {/* Show the ViewIncidents component */}
        {/* Show incidents in a table */}
        {showViewIncidents && <ViewIncident />}
        {/* Render Calendar when showCalendar is true */}
        {showCalendar && <Calendar />}
      </div>
    </div>
  );
};

export default App;
