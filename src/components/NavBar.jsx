import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "../assets/styles/NavBar.module.css";
import logo from "../assets/WorkWise.png";
import { UserContext } from "../context/AuthUserContext";

const NavBar = () => {
  let {isLoggedIn, logout } = useContext(UserContext);
  // console.log(authUser);
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

let AuntheticatedUser = () => {
  return (
    <>
      <NavLink to="/create-user" className={getLinkClass}>
        Create User
      </NavLink>
      <NavLink to="/profile" className={getLinkClass}>
        Profile
      </NavLink>
      <NavLink className={styles.link} onClick={logout}>
        Logout
      </NavLink>
    </>
  );
};


  //Anonymous User -> Home, Login , Register
  let AnonymousUser = () => {
    return (
      <>
        <NavLink to="/login" className={getLinkClass}>
          Login
        </NavLink>
        <NavLink to="/register" className={getLinkClass}>
          Register
        </NavLink>
      </>
    );
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <NavLink to="/" aria-label="Home">
          <img src={logo} alt="WorkWise Logo" className={styles.logoImage} />
        </NavLink>
      </div>
      <div className={styles.links}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        {(isLoggedIn) ? <AuntheticatedUser /> : <AnonymousUser />}
      </div>
    </nav>
  );
};

export default NavBar;
