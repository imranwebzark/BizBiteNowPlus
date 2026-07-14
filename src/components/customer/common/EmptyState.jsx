import { motion } from "framer-motion";
import {
  PackageOpen,
  Search,
  ShoppingBag,
  Gift,
  Heart,
  MapPin,
  ClipboardList,
} from "lucide-react";

const icons = {
  package: PackageOpen,
  search: Search,
  order: ShoppingBag,
  reward: Gift,
  favorite: Heart,
  address: MapPin,
  history: ClipboardList,
};

const EmptyState = ({
  icon = "package",
  title = "Nothing Here Yet",
  description = "Content will appear here when available.",
  actionText,
  onAction,
  image,
  className = "",
}) => {
  const Icon =
    icons[icon] || PackageOpen;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`
        flex
        flex-col
        items-center
        justify-center

        rounded-[32px]

        border
        border-slate-200

        bg-white

        px-8
        py-14

        text-center

        shadow-sm

        ${className}
      `}
    >
      {/* Illustration */}

      {image ? (
        <img
          src={image}
          alt={title}
          className="
            mb-8

            h-44
            w-44

            object-contain
          "
        />
      ) : (
        <div
          className="
            mb-8

            flex
            h-28
            w-28

            items-center
            justify-center

            rounded-full
          "
          style={{
            background:
              "var(--primary-light)",
          }}
        >
          <Icon
            size={50}
            style={{
              color: "var(--primary)",
            }}
          />
        </div>
      )}

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md leading-7 text-slate-500">
        {description}
      </p>

      {/* Action */}

      {actionText && (
        <button
          onClick={onAction}
          className="
            mt-8

            rounded-2xl

            px-8
            py-4

            font-semibold

            text-white

            transition-all

            hover:scale-[1.03]
            active:scale-95
          "
          style={{
            background:
              "var(--primary)",
          }}
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;