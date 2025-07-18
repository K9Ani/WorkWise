import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from '../assets/styles/Login.module.css';
import Footer from './../components/Footer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/AuthUserContext';

const Login = () => {
  let navigate = useNavigate();
  const [login, setLogin] = useState({ user: '', pswd: '' });
  let {setIsLoggedIn} = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      let userEmail = window.localStorage.getItem("email");
      let userPassword = window.localStorage.getItem("password");
      if(userEmail === login.user && userPassword === login.pswd) {
        toast.success("Login successful");
        setIsLoggedIn(true)
        navigate('/')
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>
          <input
            type="text"
            placeholder="Username"
            name="user"
            value={login.user}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="pswd"
            value={login.pswd}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
