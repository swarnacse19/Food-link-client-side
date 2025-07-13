import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AllDonations from "../pages/AllDonations/AllDonations";
import DashboardLayout from "../layouts/DashboardLayout";
import Forbidden from "../pages/Forbidden";
import Profile from "../pages/Dashboard/Profile";
import ManageUsers from "../pages/Dashboard/AdminAccess/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "forbidden",
          Component: Forbidden
        },
        {
          path: "allDonations",
          element: <PrivateRoute>
            <AllDonations></AllDonations>
          </PrivateRoute>
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children:[
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "manage-users",
        Component: ManageUsers
      },
      // {
      //   path: 'makeAdmin',
      //   element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      // }
    ]
  }
]);