import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Incident Management</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        <h2>Manage Section</h2>
        <div className="sidebar__link">
          <i className="fa-solid fa-user-tie"></i>
          <a href="#">Admin Management</a>
        </div>
        <div className="sidebar__link">
          <i class="fa-solid fa-building"></i>
          <a href="#">Company Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="#">Customer Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <a href="#">Complains</a>
        </div>
        <div className="sidebar__link">
          <i class="fa-solid fa-handshake"></i>
          <a href="#">Customer Contract</a>
        </div>
        <h2>Setting Section</h2>
        <div className="sidebar__link">
          <i class="fa-solid fa-calendar-days"></i>
          <a href="#">Calender</a>
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
