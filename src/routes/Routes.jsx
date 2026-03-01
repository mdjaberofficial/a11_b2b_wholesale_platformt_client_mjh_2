import { createBrowserRouter } from "react-router"; // or "react-router"
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";
import MyProducts from "../pages/MyProducts";
import UpdateProduct from "../pages/UpdateProduct";
import CategoriesPage from "../pages/CategoriesPage"; // <-- 1. Import it here
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/cart";

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
      // 2. Add the Categories route (Public)
      {
        path: "categories",
        element: <CategoriesPage />,
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
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "product/:id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>
      },
      {
        path: "cart",
        element: <PrivateRoute><Cart /></PrivateRoute>
      }
    ],
  },
]);

export default router;