import {
  LayoutDashboard,
  Package,
  IndianRupee,
  ShoppingCart,
  Truck,
  Gift,
  BarChart3,
  Settings,
  LogOut,
  TicketPercent
} from "lucide-react";

import { useState, useEffect, useRef, useCallback } from "react";

import icon from "../../assets/BIZ BITE NOW Vertical with Icon.png";
import logo from "../../assets/BIZ BITE NOW Horizontal with Icon.png";
import SidebarItem from "./SidebarItem";

// Temporary - replace with backend value later
const user = {
  subscription: "plus", // "free" | "plus"
};

const isPlus = user.subscription === "plus";

export default function Sidebar({
  sidebarOpen,
  closeSidebar,
  onExpandedChange,
}) {
  const [collapsed, setCollapsed] = useState(window.innerWidth >= 1024);

  const hoverTimer = useRef(null);

  const isDesktop = useCallback(() => window.innerWidth >= 1024, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const expandSidebar = () => {
    if (!isDesktop()) return;

    setCollapsed(false);
    onExpandedChange?.(true);
  };

  const collapseSidebar = () => {
    if (!isDesktop()) return;

    setCollapsed(true);
    onExpandedChange?.(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <aside
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) {
          expandSidebar();
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) {
          collapseSidebar();
        }
      }}
      className={`
          fixed
          top-4
          bottom-4
          left-4

          z-40
          flex
          flex-col
          overflow-hidden

          rounded-3xl
          bg-slate-100
          shadow-xl

          transform-gpu
          will-change-transform
          will-change-[width]

          transition-all
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]

          /* Mobile */
          w-72
          ${sidebarOpen ? "translate-x-0" : "-translate-x-[120%]"}

          /* Desktop */
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-56"}
          `}
    >
      {/* Logo */}

      <div
        className="
        flex
        h-20
        items-center
        justify-center

        px-4
        py-8
      "
      >
        <div
          className={`
          flex
          items-center
          justify-center

          transition-all
          duration-300

          ${collapsed ? "w-14" : "w-full"}
        `}
        >
          {collapsed ? (
            <img
              src={icon}
              alt="BizBiteNow"
              className="
              h-14
              w-14
              rounded-xl
              object-contain
              transition-all
              duration-300
            "
            />
          ) : (
            <img
              src={logo}
              alt="BizBiteNow"
              className="
              h-16
              w-auto
              object-contain
              transition-all
              duration-300
            "
            />
          )}
        </div>
      </div>

      {/* Navigation */}

      {/* Navigation */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-2">
          <SidebarItem
            title="Dashboard"
            icon={LayoutDashboard}
            to="/seller/dashboard"
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Product Management"
            icon={Package}
            to="/seller/products"
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Orders"
            icon={ShoppingCart}
            to="/seller/orders"
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Delivery"
            icon={Truck}
            to="/seller/delivery"
            premium={!isPlus}
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />
          <SidebarItem
            title="Special Offers"
            icon={TicketPercent}
            to="/seller/special-offers"
            premium={!isPlus}
            collapsed={collapsed}
          />

          <SidebarItem
            title="Festive Menu"
            icon={Gift}
            to="/seller/festivemenu"
            premium={!isPlus}
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Earnings"
            icon={IndianRupee}
            to="/seller/earnings"
            premium={!isPlus}
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Analytics"
            icon={BarChart3}
            to="/seller/analytics"
            premium={!isPlus}
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />

          <SidebarItem
            title="Store Settings"
            icon={Settings}
            to="/seller/settings"
            collapsed={window.innerWidth >= 1024 ? collapsed : false}
            onClick={closeSidebar}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200 p-3">
        <SidebarItem
          title="Logout"
          icon={LogOut}
          to="/login"
          collapsed={window.innerWidth >= 1024 ? collapsed : false}
          danger
          onClick={closeSidebar}
        />
      </div>
    </aside>
  );
}