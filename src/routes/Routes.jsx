import { createBrowserRouter } from "react-router"; 
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts"; // <-- 1. Import it

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
      // Protected Routes
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AllProducts /> {/* <-- 2. Add as Private Route */}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;