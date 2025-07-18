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
import MyDonations from "../pages/Dashboard/RestaurantAccess/MyDonations";
import EditDonation from "../pages/Dashboard/RestaurantAccess/EditDonation";
import DonationStats from "../pages/Dashboard/RestaurantAccess/DonationStats";
import ManageDonations from "../pages/Dashboard/AdminAccess/ManageDonations";
import FeatureDonations from "../pages/Dashboard/AdminAccess/FeatureDonations";
import CharityWrapper from "../pages/Dashboard/UserAccess/CharityWrapper";
import CharityTransactions from "../pages/Dashboard/UserAccess/CharityTransactions";
import ManageRoleRequest from "../pages/Dashboard/AdminAccess/ManageRoleRequest";
import DonationDetails from "../pages/AllDonations/DonationDetails";
import Favorites from "../pages/Dashboard/UserAccess/Favorites";
import MyReviews from "../pages/Dashboard/UserAccess/MyReviews";

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
        },
        {
          path: "donation-details/:id",
          element: <PrivateRoute>
            <DonationDetails></DonationDetails>
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
        path: "manage-donations",
        element: <AdminRoute>
          <ManageDonations></ManageDonations>
        </AdminRoute>
      },
      {
        path: "featured-donations",
        element: <AdminRoute>
          <FeatureDonations></FeatureDonations>
        </AdminRoute>
      },
      {
        path: "role-requests",
        element: <AdminRoute>
          <ManageRoleRequest></ManageRoleRequest>
        </AdminRoute>
      },
      {
        path: "add-donation",
        element: <RestaurantRoute>
          <AddDonation></AddDonation>
        </RestaurantRoute>
      },
      {
        path: "my-donations",
        element: <RestaurantRoute>
          <MyDonations></MyDonations>
        </RestaurantRoute>
      },
      {
        path: "edit-donation/:id",
        element: <RestaurantRoute>
          <EditDonation></EditDonation>
        </RestaurantRoute>
      },
      {
        path: "statistics",
        element: <RestaurantRoute>
          <DonationStats></DonationStats>
        </RestaurantRoute>
      },
      {
        path: "request-charity-role",
        Component: CharityWrapper
      },
      {
        path: "transactions",
        Component: CharityTransactions
      },
      {
        path: "favorites",
        Component: Favorites
      },
      {
        path: "my-reviews",
        Component: MyReviews
      }
    ]
  },
  {
    path: "/*",
    Component: ErrorPage
  }
]);