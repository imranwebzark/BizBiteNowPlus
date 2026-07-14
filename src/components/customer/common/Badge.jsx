import { CheckCircle2, AlertTriangle, XCircle, Info, Crown } from "lucide-react";

const variants = {
  success: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle2,
  },

  warning: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: AlertTriangle,
  },

  danger: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: XCircle,
  },

  info: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: Info,
  },

  premium: {
    bg: "",
    text: "text-white",
    icon: Crown,
  },
};

const sizes = {
  sm: {
    wrapper: "px-2.5 py-1 text-xs gap-1",
    icon: 12,
  },

  md: {
    wrapper: "px-3 py-1.5 text-sm gap-2",
    icon: 14,
  },

  lg: {
    wrapper: "px-4 py-2 text-base gap-2",
    icon: 16,
  },
};

const Badge = ({
  children,
  variant = "info",
  size = "md",
  rounded = "full",
  icon = true,
  className = "",
}) => {
  const current =
    variants[variant] || variants.info;

  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center

        font-semibold

        whitespace-nowrap

        ${
          rounded === "full"
            ? "rounded-full"
            : "rounded-xl"
        }

        ${
          variant === "premium"
            ? ""
            : `${current.bg} ${current.text}`
        }

        ${sizes[size].wrapper}

        ${className}
      `}
      style={
        variant === "premium"
          ? {
              background: "var(--primary)",
            }
          : {}
      }
    >
      {icon && (
        <Icon
          size={sizes[size].icon}
        />
      )}

      {children}
    </span>
  );
};

export default Badge;