import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";

const CustomerLayout = () => {
  return (
    <div className="bg-[#FAFAF5] min-h-screen" style={{ fontFamily: "Arial, sans-serif" }}>
      <CustomerHeader />
      <div className="flex">
        <CustomerSidebar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
