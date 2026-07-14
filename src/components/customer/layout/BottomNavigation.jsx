import { NavLink } from "react-router-dom";

import {
  House,
  UtensilsCrossed,
  ReceiptText,
  Gift,
  User,
} from "lucide-react";


const navItems = [
  {
    label: "Home",
    icon: House,
    path: "/customer",
  },
  {
    label: "Menu",
    icon: UtensilsCrossed,
    path: "/customer/menu",
  },
  {
    label: "Orders",
    icon: ReceiptText,
    path: "/customer/orders",
  },
  {
    label: "Rewards",
    icon: Gift,
    path: "/customer/rewards",
  },
  {
    label: "Profile",
    icon: User,
    path: "/customer/profile",
  },
];


const BottomNavigation = () => {

  return (

    <nav
      className="
        fixed

        bottom-2

        left-4

        right-4

        z-50

        lg:hidden
      "
    >

      <div
        className="
          flex

          items-center

          justify-around

          rounded-[10px]

          border

          border-slate-200

          bg-white/90

          px-2

          py-2

          shadow-2xl

          backdrop-blur-xl
        "
      >

        {
          navItems.map(
            ({
              label,
              icon: Icon,
              path,
            }) => (

              <NavLink
                key={path}
                to={path}
                end={
                  path === "/customer"
                }

                className="
                  flex

                  flex-1

                  justify-center
                "
              >

                {
                  ({isActive}) => (

                    <div
                      className={`
                        relative

                        flex

                        h-12

                        w-12

                        flex-col

                        items-center

                        justify-center

                        rounded-[10px]

                        transition-all

                        duration-300

                        ${
                          isActive
                          ?
                          "text-white shadow-lg"
                          :
                          "text-slate-500 hover:bg-slate-100"
                        }
                      `}

                      style={{
                        background:
                          isActive
                          ?
                          "var(--primary)"
                          :
                          "transparent",
                      }}
                    >

                      <Icon
                        size={20}
                        strokeWidth={2.3}
                      />


                      <span
                        className="
                          mt-0.5

                          text-[10px]

                          font-semibold
                        "
                      >
                        {label}
                      </span>



                      {
                        isActive && (

                          <span
                            className="
                              absolute

                              -bottom-1

                              h-1

                              w-5

                              rounded-[14px]

                              bg-white
                            "
                          />

                        )
                      }


                    </div>

                  )
                }


              </NavLink>

            )
          )
        }


      </div>


    </nav>

  );

};


export default BottomNavigation;