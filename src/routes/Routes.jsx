import { createBrowserRouter } from "react-router"; // Just keeping your setup, though react-router is fine too!
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/AddProduct"; // <-- 1. Import it here

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div className="p-10 text-center text-red-500 text-2xl">Oops! Page not found.</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct /> {/* <-- 2. Use it here */}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;