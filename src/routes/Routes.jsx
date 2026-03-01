import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

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
      // Future routes:
      // { path: "all-products", element: <AllProducts /> },
      // { path: "login", element: <Login /> },
    ],
  },
]);

export default router;