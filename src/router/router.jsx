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
import AdminRoute from "../routes/AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import RestaurantRoute from "../routes/RestaurantRoute";
import AddDonation from "../pages/Dashboard/RestaurantAccess/AddDonation";

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
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "add-donation",
        element: <RestaurantRoute>
          <AddDonation></AddDonation>
        </RestaurantRoute>
      }
    ]
  },
  {
    path: "/*",
    Component: ErrorPage
  }
]);