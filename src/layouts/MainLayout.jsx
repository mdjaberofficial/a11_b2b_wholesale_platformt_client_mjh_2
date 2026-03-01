import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Navbar */}
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;