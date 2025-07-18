import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateUser from "./components/CreateUser";
import Layout from "./components/Layout";
import ViewEmployees from "./components/ViewEmployees";
import EmployeeDetails from "./components/EmployeeDetails";
import EditUser from "./components/EditUser";
import Profile from "./pages/Profile";
import AuthUserContext from "./context/AuthUserContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import PublicRoutes from "./context/PublicRoutes";
const App = () => {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              {" "}
              <ViewEmployees />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/create-user",
          element: (
            <ProtectedRoutes>
              <CreateUser />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          ),
        },
        {
          path: "/register",
          element: (
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          ),
        },
        {
          path: "employees/:id",
          element: (
            <ProtectedRoutes>
              <EmployeeDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/employees/:id/edit",
          element: (
            <ProtectedRoutes>
              <EditUser />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthUserContext>
        <RouterProvider router={routes} />
      </AuthUserContext>
    </>
  );
};

export default App;
