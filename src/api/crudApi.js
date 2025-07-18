import axios from "axios";

export let getUsers = () => {
    return axios.get("http://localhost:3001/employees")
}

export let createUsers = (data) => {
    return axios.post("http://localhost:3001/employees", data)
}

export const updateUser = (id, data) => {
  return axios.put(`http://localhost:3001/employees/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`http://localhost:3001/employees/${id}`);
}
