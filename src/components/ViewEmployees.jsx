import React, { useEffect, useState } from "react";
import { getUsers } from "../api/crudApi";
import styles from "../assets/styles/ViewEmployees.module.css";
import { NavLink } from "react-router-dom";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    getUsers()
      .then((res) => setEmployees(res.data))
      .catch((err) => {
        console.error("Failed to fetch employees", err);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.status}>Loading…</div>;

  if (fetchError) {
    return (
      <div className={styles.status}>
        Failed to load employees.
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Employees</h2>

      {employees.length === 0 ? (
        <p className={styles.status}>No employees found.</p>
      ) : (
        <div className={styles.cardGrid}>
          {employees.map((emp) => (
            <div className={styles.card} key={emp.id}>
              {emp.image && (
                <img src={emp.image} alt={emp.name} className={styles.avatar} />
              )}
              <h3>{emp.name}</h3>
              <p>
                <strong>Designation:</strong> {emp.designation}
              </p>
              <p>
                <strong>Role:</strong> {emp.role}
              </p>
              <p>
                <strong>Salary:</strong> ₹{emp.salary}
              </p>
              <NavLink className={styles.viewBtn} to={`/employees/${emp.id}`}>
                View
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
