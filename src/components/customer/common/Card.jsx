import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  padding = "default",
  shadow = "default",
  border = true,
  rounded = "3xl",
  onClick,
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-xl",
  };

  const radius = {
    xl: "rounded-2xl",
    "3xl": "rounded-[30px]",
    full: "rounded-full",
  };

  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
            }
          : undefined
      }
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className={`
        overflow-hidden

        bg-white

        ${
          border
            ? "border border-slate-200"
            : ""
        }

        ${radius[rounded]}
        ${paddings[padding]}
        ${shadows[shadow]}

        ${
          onClick
            ? "cursor-pointer"
            : ""
        }

        transition-all

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;