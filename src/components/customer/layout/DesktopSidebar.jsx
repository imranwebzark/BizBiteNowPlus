import { NavLink } from "react-router-dom";
import {
  House,
  UtensilsCrossed,
  ReceiptText,
  Gift,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    path: "/customer",
    icon: House,
  },
  {
    label: "Menu",
    path: "/customer/menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Orders",
    path: "/customer/orders",
    icon: ReceiptText,
  },
  {
    label: "Rewards",
    path: "/customer/rewards",
    icon: Gift,
  },
  {
    label: "Profile",
    path: "/customer/profile",
    icon: User,
  },
];

const DesktopSidebar = ({
  store = {},
  onLogout,
  expanded,
  setExpanded,
}) => {
  return (
    <aside
      onMouseEnter={() =>
        setExpanded(true)
      }
      onMouseLeave={() =>
        setExpanded(false)
      }
      className={`
        hidden
        lg:flex

        fixed
        left-5
        top-5
        bottom-5
        z-50

        overflow-hidden

        flex-col
        items-center

        rounded-[30px]

        border
        border-slate-200

        bg-white/90

        backdrop-blur-xl

        shadow-xl

        transition-all
        duration-300
        ease-in-out

        ${
          expanded
            ? "w-60"
            : "w-24"
        }
      `}
    >
      {/* Logo */}

      <div className="pt-5 pb-8">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            text-lg
            font-black
            text-white

            shadow-lg
          "
          style={{
            background:
              "var(--primary)",
          }}
        >
          {store.initials || "BB"}
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex w-full flex-1 flex-col gap-4 px-5">
        {navItems.map(
          ({
            icon: Icon,
            path,
            label,
          }) => (
            <NavLink
              key={path}
              to={path}
              end={
                path === "/customer"
              }
              className="w-full"
            >
              {({
                isActive,
              }) => (
                <div
                  className={`
                    relative

                    flex
                    h-14
                    w-full

                    items-center
                    gap-4

                    rounded-2xl

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-green-700 hover:bg-slate-100 hover:text-yellow-600"
                    }
                  `}
                  style={{
                    background:
                      isActive
                        ? "var(--secondary)"
                        : "transparent",
                  }}
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                    "
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    className={`
                      whitespace-nowrap
                      text-sm
                      font-semibold

                      transition-all
                      duration-300

                      ${
                        expanded
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  >
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ),
        )}
      </nav>

      {/* Logout */}

      <div className="w-full px-5 pb-5">
        <button
          onClick={onLogout}
          className="
            flex
            h-14
            w-full
            items-center
            gap-4

            rounded-2xl

            text-red-600

            transition

            hover:bg-red-50
            hover:text-red-700
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
            "
          >
            <LogOut size={22} />
          </div>

          <span
            className={`
              whitespace-nowrap
              text-sm
              font-semibold

              transition-all
              duration-300

              ${
                expanded
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;