import React from "react";
import { Menu, Clock } from "lucide-react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "../../ProfileMenu";
const user = {
  subscription: "plus", // "free" | "plus"
};

const isPlus = user.subscription === "plus";
const pageTitles = {
  "/seller/dashboard": "Dashboard",
  "/seller/products": "Products",
  "/seller/categories": "Categories",
  "/seller/inventory": "Inventory",
  "/seller/orders": "Orders",
  "/seller/delivery": "Delivery Management",
  "/seller/offers": "Marketing",
  "/seller/analytics": "Analytics",
  "/seller/settings": "Settings",
};

export default function Navbar({ openSidebar }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/seller/dashboard";

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
<header
  className="
    fixed
    top-0
    left-0
    z-30

    flex
    items-center

    h-16
    w-full

    border-b
    border-slate-200
    bg-slate-100

    px-3
    shadow-md

    max-[1024px]:relative
    max-[1024px]:shadow-none

    min-[1025px]:fixed
    min-[1025px]:top-4
    min-[1025px]:left-1/2
    min-[1025px]:h-[72px]
    min-[1025px]:w-[55%]
    min-[1025px]:-translate-x-1/2
    min-[1025px]:rounded-3xl
    min-[1025px]:border
    min-[1025px]:px-6
  "
>
  {/* Left */}

  <div className="flex w-10 shrink-0 items-center justify-start">
    <button
      onClick={openSidebar}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        transition-all
        duration-300
        hover:bg-[#FDFDF5]
        active:scale-95
        lg:hidden
      "
    >
      <Menu size={22} strokeWidth={2} />
    </button>
  </div>

  {/* Center */}

 <div className="relative flex-1 h-[52px] overflow-hidden lg:flex lg:justify-start">

<div
  className={`absolute inset-0 flex items-center  lg:justify-start lg:px-0 px-2 transition-all duration-500 ease-in-out ${
    isDashboard
      ? "translate-y-0 opacity-100"
      : "-translate-y-6 opacity-0 pointer-events-none"
  }`}
>
  <h2
    className="
      truncate
      text-center
      font-bold
      leading-none
      text-slate-900

      text-[15px]
      sm:text-[17px]
      md:text-[20px]
      lg:text-[18px]
      xl:text-[24px]
    "
  >
    BizBitesNow
    <span className="text-green-700 font-inter">{isPlus ? "Plus" : ""}</span>
  </h2>
</div>

{/* Time & Date */}

<div
  className={`absolute inset-0 flex items-center  lg:justify-start transition-all duration-500 ease-in-out ${
    !isDashboard
      ? "translate-y-0 opacity-100"
      : "translate-y-6 opacity-0 pointer-events-none"
  }`}
>
  <div className="flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-2 backdrop-blur-sm">
    <div className="rounded-xl bg-[#16522d]/10 p-2">
      <Clock
        size={18}
        className="text-[#16522d]"
      />
    </div>

    <div className="leading-tight">
      <p className="text-[11px] text-slate-500">
        {formattedDate}
      </p>

      <p className="text-sm font-semibold text-slate-900">
        {formattedTime}
      </p>
    </div>
  </div>
</div>

</div>
{/* Right */}

<div className="flex shrink-0 items-center gap-2 sm:gap-3">

  <div className="flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11">
    <NotificationButton />
  </div>

  <div className="flex items-center">
    <ProfileMenu
      seller={{
        name: "Seller",
        role: "Plus Seller",
      }}
    />
  </div>

</div>
    </header>
  );
}
