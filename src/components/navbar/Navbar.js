import "./Navbar.css";
import avatar from "../../assets/user.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i class="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <a className="active_link" href="#">
          Customer
        </a>
        <a href="#">Complain Management</a>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i class="fa-solid fa-clock"></i>
        </a>
        <a href="#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
