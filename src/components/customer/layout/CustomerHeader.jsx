import {
  Bell,
  User,
  ShoppingBag,
  Gift,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getStore,
  getNotifications,
  getProfile,
} from "../../../api/customerApi";

const CustomerHeader = ({
  sidebarExpanded,
  isDesktop,
}) => {
  const navigate = useNavigate();

  const [store, setStore] = useState({});

  const [customer, setCustomer] = useState({});

  const [notifications, setNotifications] =
    useState([]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          storeRes,
          notificationRes,
          profileRes,
        ] = await Promise.all([
          getStore(),
          getNotifications(),
          getProfile(),
        ]);

        setStore(
          storeRes.data.data ||
            storeRes.data ||
            {},
        );

        setNotifications(
          notificationRes.data.data ||
            notificationRes.data ||
            [],
        );

        setCustomer(
          profileRes.data.data ||
            profileRes.data ||
            {},
        );
      } catch (error) {
        console.error(
          "Header API Error:",
          error,
        );
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target,
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const getNotificationIcon = (
    type,
  ) => {
    if (type === "reward")
      return Gift;

    return ShoppingBag;
  };

  const storeAddress = store?.address
    ? `${store.address.line1 ?? ""}, ${store.address.city ?? ""}`
    : "Tap to view restaurant";

  const storeLogo =
    store?.logo ||
    "https://via.placeholder.com/100";

return (
<header
  className="
    fixed
    top-3
    z-50

    transition-all
    duration-300
    ease-in-out

    px-3
    lg:px-5
    lg:pr-10
  "
  style={
    isDesktop
      ? {
          left: sidebarExpanded
            ? "16.25rem"
            : "7.25rem",

          width: sidebarExpanded
            ? "calc(100vw - 16.25rem)"
            : "calc(100vw - 7.25rem)",
        }
      : {
          left: 0,
          width: "100%",
        }
  }
>
<div
  ref={wrapperRef}
  className="
    relative

    flex

    h-20

    w-full

    items-center
    justify-between

    rounded-[10px]

    border
    border-slate-200

    bg-white/90

    px-5

    shadow-xl

    backdrop-blur-xl

    transition-all
duration-300
ease-in-out
  "
>
      {/* Store */}

      <button
        onClick={() =>
          navigate("/customer/store")
        }
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-3
          text-left
        "
      >
        {/* Logo */}

        <img
          src={storeLogo}
          alt={store?.name}
          className="
            h-11
            w-11

            rounded-2xl

            border
            border-slate-200

            object-cover
            shadow-sm
          "
        />

        {/* Store Info */}

        <div className="min-w-0 flex-1">
          <h2
            className="
              truncate

              text-[15px]
              font-bold

              text-slate-900
            "
          >
            {store?.name ||
              "Restaurant"}
          </h2>

          <p
            className="
              truncate

              text-xs

              text-slate-500
            "
          >
            {storeAddress}
          </p>
        </div>
      </button>

      {/* Actions */}

      <div
        className="
          ml-3

          flex
          items-center
          gap-2
        "
      >
        {/* Notification */}

        <button
          onClick={() =>
            setNotificationOpen(
              !notificationOpen,
            )
          }
          className="
            relative

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-[10px]

            transition

            bg-slate-200
          "
        >
          <Bell
            size={20}
            style={{
              color:
                "var(--primary)",
            }}
          />

          {notifications.length >
            0 && (
            <span
              className="
                absolute

                right-2
                top-2

                flex

                h-4
                w-4

                items-center
                justify-center

                rounded-full

                text-[10px]

                text-white
              "
              style={{
                background:
                  "var(--primary)",
              }}
            >
              {notifications.length}
            </span>
          )}
        </button>

        {/* Profile
            Hidden on Mobile
        */}

        <button
          onClick={() =>
            navigate(
              "/customer/profile",
            )
          }
          className="
            hidden
            lg:flex

            h-11
            w-11

            items-center
            justify-center

            rounded-[10px]

            transition

            bg-slate-200
          "
        >
          <User size={20} />
        </button>
      </div>

           {/* Notification Panel */}

      {notificationOpen && (
        <div
          className="
            absolute

            right-0
            top-[72px]

            w-[320px]
            max-w-[calc(100vw-24px)]

            overflow-hidden

            rounded-3xl

            border
            border-slate-200

            bg-white

            shadow-2xl
          "
        >
          <div className="border-b border-slate-100 p-5">
            <h3 className="text-lg font-bold text-slate-900">
              Notifications
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest updates from the restaurant.
            </p>
          </div>

          <div
            className="
              max-h-[420px]
              overflow-y-auto
            "
          >
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell
                  size={34}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="font-semibold text-slate-700">
                  No notifications
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  You're all caught up.
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const Icon =
                  getNotificationIcon(item.type);

                return (
                  <button
                    key={item.id}
                    className="
                      flex
                      w-full
                      gap-4

                      border-b
                      border-slate-100

                      p-4

                      text-left

                      transition

                      hover:bg-slate-50
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-2xl

                        bg-slate-100
                      "
                    >
                      <Icon
                        size={20}
                        style={{
                          color:
                            "var(--primary)",
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {item.time}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  </header>
);

};

export default CustomerHeader;