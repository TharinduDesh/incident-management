import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  onReportIncident,
  onViewIncidents,
  onViewCalendar,
  onViewDashboard,
}) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <br></br>
          <h1>Incident Management</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <h2>Manage Section</h2>
        {/* <div className="sidebar__link">
          <i className="fa-solid fa-user-tie"></i>
          <a href="#">Profile</a>
        </div> */}
        <div className="sidebar__link" onClick={onViewDashboard}>
          <i className="fa fa-tachometer-alt"></i>
          <a href="#">Dashboard</a>
        </div>
        <div className="sidebar__link" onClick={onReportIncident}>
          {" "}
          {/* Call onReportIncident */}
          <i className="fa-solid fa-triangle-exclamation"></i>
          <a href="#">Report an Incident</a>
        </div>
        <div className="sidebar__link" onClick={onViewIncidents}>
          <i className="fa-solid fa-folder-open"></i>
          <a href="#">View Incidents</a>
        </div>
        <h2>Setting Section</h2>
        <div className="sidebar__link" onClick={onViewCalendar}>
          <i className="fa-solid fa-calendar-days"></i>
          <a href="#">Calendar</a>
        </div>
        <div className="sidebar__link">
          <i className="fa-solid fa-gear"></i>
          <a href="#">Setting</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
