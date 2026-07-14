import {
  ChevronRight,
  Globe,
  Moon,
  Shield,
  CircleHelp,
  FileText,
  LogOut,
  Trash2,
  Palette,
  Heart,
} from "lucide-react";

const settings = [
  {
    id: "appearance",
    title: "Appearance",
    subtitle: "Customize your app experience",
    icon: Palette,
  },
  {
    id: "language",
    title: "Language",
    subtitle: "English",
    icon: Globe,
  },
  {
    id: "favorites",
    title: "Favorite Restaurants",
    subtitle: "Manage your favourites",
    icon: Heart,
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    subtitle: "Password, permissions & privacy",
    icon: Shield,
  },
  {
    id: "support",
    title: "Help & Support",
    subtitle: "FAQs and Contact Us",
    icon: CircleHelp,
  },
  {
    id: "terms",
    title: "Terms & Privacy Policy",
    subtitle: "Read our policies",
    icon: FileText,
  },
];

const SettingsCard = ({
  darkMode = false,
  onToggleDarkMode,
  onItemClick,
  onLogout,
  onDeleteAccount,
}) => {
  return (
    <section className="space-y-6">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Settings
        </h2>

        <p className="mt-2 text-slate-500">
          Personalize your account and preferences.
        </p>
      </div>

      {/* Settings */}

      <div
        className="
          overflow-hidden

          rounded-[30px]

          border
          border-slate-200

          bg-white

          shadow-sm
        "
      >
        {settings.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={`
                flex
                w-full
                items-center
                gap-5

                p-5

                text-left

                transition

                hover:bg-slate-50

                ${
                  index !== settings.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }
              `}
            >
              <div
                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  text-white
                "
                style={{
                  background: "var(--primary)",
                }}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>

              <ChevronRight
                size={20}
                className="text-slate-400"
              />
            </button>
          );
        })}
      </div>

      {/* Dark Mode */}

      <div
        className="
          flex
          items-center
          gap-5

          rounded-[30px]

          border
          border-slate-200

          bg-white

          p-6

          shadow-sm
        "
      >
        <div
          className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            text-white
          "
          style={{
            background: "var(--primary)",
          }}
        >
          <Moon size={20} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">
            Dark Mode
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Reduce eye strain at night.
          </p>
        </div>

        <button
          onClick={onToggleDarkMode}
          className={`
            relative

            h-7
            w-14

            rounded-full

            transition-all

            ${
              darkMode
                ? ""
                : "bg-slate-300"
            }
          `}
          style={{
            background: darkMode
              ? "var(--primary)"
              : undefined,
          }}
        >
          <span
            className={`
              absolute
              top-1

              h-5
              w-5

              rounded-full

              bg-white

              shadow

              transition-all

              ${
                darkMode
                  ? "left-8"
                  : "left-1"
              }
            `}
          />
        </button>
      </div>

      {/* Logout */}

      <button
        onClick={onLogout}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3

          rounded-[24px]

          border
          border-red-200

          bg-red-50

          py-4

          font-semibold

          text-red-600

          transition

          hover:bg-red-100
        "
      >
        <LogOut size={20} />

        Logout
      </button>

      {/* Delete */}

      <button
        onClick={onDeleteAccount}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3

          rounded-[24px]

          border
          border-red-600

          bg-red-600

          py-4

          font-semibold

          text-white

          transition

          hover:bg-red-700
        "
      >
        <Trash2 size={20} />

        Delete Account
      </button>
    </section>
  );
};

export default SettingsCard;