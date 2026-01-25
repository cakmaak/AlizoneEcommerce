import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import FullPageLoader from "../common/FullPageLoader";
import Footer from "../../components/layout/Footer";

const MainLayout = () => {
  const loading = useSelector((state) => state.ui.loading);

  return (
    <div className="min-h-screen flex flex-col">
      {loading && <FullPageLoader />}

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
