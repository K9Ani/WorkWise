import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../api/crudApi";
import styles from "../assets/styles/EmployeeDetails.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const found = res.data.find((u) => String(u.id) === id);
        setEmp(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(emp.id);
      toast.success("User deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  if (loading) return <div className={styles.status}>Loading…</div>;
  if (!emp) return <div className={styles.status}>Employee not found.</div>;

  return (
    <div className={styles.wrapper}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          <button
            className={styles.editBtn}
            onClick={() => navigate(`/employees/${emp.id}/edit`)}
            title="Edit"
          >
            <FiEdit />
          </button>

          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            title="Delete"
          >
            <MdDeleteForever />
          </button>
        </div>

        <div className={styles.body}>
          {emp.image && (
            <img src={emp.image} alt={emp.name} className={styles.avatar} />
          )}

          <div className={styles.details}>
            <h2 className={styles.name}>{emp.name}</h2>
            <p><strong>ID:</strong> #{emp.id}</p>
            <p><strong>Designation:</strong> {emp.designation}</p>
            <p><strong>Role:</strong> {emp.role}</p>
            <p><strong>Salary:</strong> ₹{emp.salary}</p>
            {emp.email && <p><strong>Email:</strong> {emp.email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
