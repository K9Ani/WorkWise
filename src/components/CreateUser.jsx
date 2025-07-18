import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../assets/styles/CreateUser.module.css";
import { createUsers } from "../api/crudApi";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    salary: "",
    designation: "",
    role: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const navigate = useNavigate();

  // ---------------- text inputs ----------------
  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // ---------------- image upload ---------------
  const handleImage = async ({ target: { files } }) => {
    if (!files[0]) return;
    try {
      toast.loading("Uploading image…", { id: "img" });
      const url = await uploadToCloudinary(files[0]);
      setForm((prev) => ({ ...prev, image: url }));
      toast.success("Image uploaded!", { id: "img" });
    } catch {
      toast.error("Image upload failed", { id: "img" });
    }
  };

  // ---------------- submit ---------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.designation || !form.role) {
      setError("Name, designation and role are required.");
      return;
    }

    try {
      setLoading(true);
      await createUsers({ ...form, salary: Number(form.salary) || 0 });
      toast.success("Employee created!");
      navigate("/");
    } catch {
      setError("Failed to create employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Create New Employee</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="salary"
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="designation"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className={styles.input}
      />

      {form.image && (
        <img src={form.image} alt="preview" className={styles.preview} />
      )}

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Saving…" : "Create"}
      </button>
    </form>
  );
};

export default CreateUser;
