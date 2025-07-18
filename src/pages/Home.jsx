// import React, { useEffect, useState } from 'react'
// import NavBar from '../components/NavBar'
// import Footer from './../components/Footer';
// import styles from '../assets/styles/Home.module.css'
// import apiRequest from '../components/apiRequest';
// import { getUsers } from '../api/crudApi';
// const Home = () => {
//   let [userData, setUserData] = useState([]);

//   const API_URL = "http://localhost:3001/employees";
//   let employees = [];

//   const readEmployees = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw Error('Did not receive expected data');
//       employees = await response.json();
//       console.log(employees)

//     } catch (err) {
//       console.log(err.message)
//     }
//   }

//   const createEmployee = async () => {
//     let newEmployee = {
//       name: "Ram",
//       designation: "Backend developer",
//       role: "Team lead"
//     }
//     const postOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newEmployee)
//     }
//     const result = await apiRequest(API_URL, postOptions);
//   }

//   const updateEmployee = async () => {
//     let myEmployee = employees.filter((item) => item.name == "Ram")
//     myEmployee[0].role = "Senior Developer";
//     const updateOptions = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(myEmployee[0])
//     };
//     const reqUrl = `${API_URL}/${myEmployee[0].id}`;
//     const result = await apiRequest(reqUrl, updateOptions);
//   }

//   const deleteEmployee = async () => {
//     let myEmployee = employees.filter((item) => item.name == "Ram")
//     const deleteOptions = { method: 'DELETE' };
//     const reqUrl = `${API_URL}/${myEmployee[0].id}`;
//     const result = await apiRequest(reqUrl, deleteOptions);
//   }

//   useEffect(() => {
//     let getData = async () => {
//     try {
//       let usersData = await getUsers();
//       console.log(usersData)
//       let {data} = usersData;
//       console.log(data)
//       setUserData(data);

//     } catch (error) {
//       console.log("Error while fetching the data:", error)
//     }
//   }
//   getData()
//   },[])
  

//   return (
//     <>
//       <NavBar />
//       <div className={styles.container}>
//         <button onClick={createEmployee}>Create</button>
//         <button onClick={readEmployees}>Read</button>
//         <button onClick={updateEmployee}>Update</button>
//         <button onClick={deleteEmployee}>Delete</button>
//       </div>
//       <section>
//         <header>
//           <h1>Users Data</h1>
//           <main>
//            { userData.map((user, id) => {
//             return <h2 key={id}>{user.name}</h2>
//            })}
//           </main>
//         </header>
//       </section>
//       <Footer />
//     </>

//   )
// }

// export default Home