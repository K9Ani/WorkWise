import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../assets/styles/Layout.module.css";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <Toaster/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
