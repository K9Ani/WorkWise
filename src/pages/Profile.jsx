import React, { useContext } from "react";
import styles from "../assets/styles/Profile.module.css";
import { UserContext } from "../context/AuthUserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!authUser) {
    return <div className={styles.container}>User not found</div>;
  }

  const initials = authUser?.email?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          {authUser.image ? (
            <img src={authUser.image} alt="User Avatar" />
          ) : (
            <div className={styles.initial}>{initials}</div>
          )}
        </div>

        <h2 className={styles.email}>{authUser.email}</h2>
        <p className={styles.meta}>Member since: Jan 2025</p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>
          <button className={styles.button} onClick={() => navigate("/change-password")}>
            Change Password
          </button>
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
