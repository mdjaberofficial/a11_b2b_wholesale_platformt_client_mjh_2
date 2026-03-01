import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Navbar */}
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-neutral text-neutral-content p-4 text-center">
        <p>© {new Date().getFullYear()} B2B Wholesale Platform - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default MainLayout;