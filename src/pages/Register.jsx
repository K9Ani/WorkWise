/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import styles from "../assets/styles/Register.module.css";
import Footer from "./../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    user: "",
    email: "",
    pswd: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (registerData.pswd === registerData.confirm) {
        let userEmail = window.localStorage.setItem(
          "email",
          registerData.email
        );
        let userPassword = window.localStorage.setItem(
          "password",
          registerData.pswd
        );
        toast.success("User resgistered successfully");
        navigate("/login")
      } else {
        toast.error("Password does not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Register</h2>
          <input
            type="text"
            placeholder="Username"
            name="user"
            value={registerData.user}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="pswd"
            value={registerData.pswd}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={registerData.confirm}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
