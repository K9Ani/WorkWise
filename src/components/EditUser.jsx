import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers, updateUser } from "../api/crudApi";
import styles from "../assets/styles/CreateUser.module.css";
import toast from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    salary: "",
    designation: "",
    role: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers().then((res) => {
      const user = res.data.find((u) => String(u.id) === id);
      user ? setForm(user) : setError("Employee not found.");
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({...form, image: reader.result }); // Base64 string
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, designation, role, salary } = form;
    if (!name || !designation || !role) {
      setError("Name, designation, and role are required.");
      return;
    }

    setLoading(true);
    try {
      await updateUser(id, { ...form, salary: Number(salary) || 0 });
      toast.success("User has been updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
        title="Go back"
      >
        ← Back
      </button>

      <h2 className={styles.title}>Update Employee</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.input}
      />

      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        type="number"
        className={styles.input}
      />

      <input
        name="designation"
        value={form.designation}
        onChange={handleChange}
        placeholder="Designation"
        className={styles.input}
      />

      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role"
        className={styles.input}
      />

      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.input}
      />

      {form.image && (
        <img src={form.image} alt="Preview" className={styles.preview} />
      )}
      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditUser;
