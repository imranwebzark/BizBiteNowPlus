import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({
  quantity = 1,
  min = 1,
  max = 99,
  size = "default",
  onChange,
}) => {
  const decrease = () => {
    if (quantity <= min) return;
    onChange?.(quantity - 1);
  };

  const increase = () => {
    if (quantity >= max) return;
    onChange?.(quantity + 1);
  };

  const sizes = {
    small: {
      wrapper: "gap-2",
      button: "h-9 w-9",
      text: "text-base w-6",
    },

    default: {
      wrapper: "gap-4",
      button: "h-11 w-11",
      text: "text-lg w-8",
    },

    large: {
      wrapper: "gap-5",
      button: "h-14 w-14",
      text: "text-xl w-10",
    },
  };

  const current = sizes[size] || sizes.default;

  return (
    <div
      className={`
        inline-flex
        items-center

        rounded-2xl

        border
        border-slate-200

        bg-white

        p-2

        shadow-sm

        ${current.wrapper}
      `}
    >
      {/* Minus */}

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        disabled={quantity <= min}
        onClick={decrease}
        className={`
          flex
          items-center
          justify-center

          rounded-xl

          transition-all

          ${
            quantity <= min
              ? "cursor-not-allowed bg-slate-100 text-slate-300"
              : "bg-slate-100 hover:bg-slate-200"
          }

          ${current.button}
        `}
      >
        <Minus size={18} />
      </motion.button>

      {/* Quantity */}

      <motion.span
        key={quantity}
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.18,
        }}
        className={`
          text-center
          font-bold
          text-slate-900

          ${current.text}
        `}
      >
        {quantity}
      </motion.span>

      {/* Plus */}

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        disabled={quantity >= max}
        onClick={increase}
        className={`
          flex
          items-center
          justify-center

          rounded-xl

          text-white

          transition-all

          ${
            quantity >= max
              ? "cursor-not-allowed opacity-50"
              : ""
          }

          ${current.button}
        `}
        style={{
          background: "var(--primary)",
        }}
      >
        <Plus size={18} />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;