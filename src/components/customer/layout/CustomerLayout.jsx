import {
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useState, useEffect
} from "react";

import DesktopSidebar from "./DesktopSidebar";
import CustomerHeader from "./CustomerHeader";
import BottomNavigation from "./BottomNavigation";
import FloatingCartButton from "./FloatingCartButton";

import { useCart } from "../../../context/CartContext";

const CustomerLayout = () => {
  const {
    totalItems,
    totalPrice,
  } = useCart();

  const location = useLocation();

  const [
    sidebarExpanded,
    setSidebarExpanded,
  ] = useState(false);

  const hideFloatingCart = [
    "/customer/cart",
    "/customer/checkout",
  ].includes(location.pathname);
const [isDesktop, setIsDesktop] = useState(
  window.innerWidth >= 1024
);

useEffect(() => {
  const handleResize = () =>
    setIsDesktop(window.innerWidth >= 1024);

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );
}, []);
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-slate-100
      "
    >
      {/* Sidebar */}

      <DesktopSidebar
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
      />

      {/* Main */}

<main
  className="
    min-h-screen
    transition-all
    duration-300
    lg:mt-5
  "
  style={{
    paddingLeft:
      window.innerWidth >= 1024
        ? sidebarExpanded
          ? "17rem"
          : "8rem"
        : "0rem",
  }}
>
        {/* Header */}

<CustomerHeader
  sidebarExpanded={sidebarExpanded}
  isDesktop={isDesktop}
/>

        {/* Content */}

        <div
          className="            w-full
            pt-22

          "
        >
          <Outlet />
        </div>
      </main>

      {!hideFloatingCart && (
        <FloatingCartButton
          totalItems={totalItems}
          totalPrice={totalPrice}
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default CustomerLayout;