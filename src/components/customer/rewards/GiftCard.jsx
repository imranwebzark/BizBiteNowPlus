import { motion } from "framer-motion";
import {
  Gift,
  Lock,
  CheckCircle2,
  Sparkles,
  Coins,
  Clock3,
} from "lucide-react";

const GiftCard = ({
  gift,
  onRedeem,
}) => {
  if (!gift) return null;

  const {
    title,
    description,
    image,
    pointsRequired,
    expiresOn,
    available = true,
    redeemed = false,
    featured = false,
  } = gift;

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        overflow-hidden

        rounded-[30px]

        border
        border-slate-200

        bg-white

        shadow-sm

        hover:shadow-xl
      "
    >
      {/* Image */}

      <div className="relative h-52 overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            hover:scale-105
          "
        />

        {featured && (
          <span
            className="
              absolute
              left-4
              top-4

              rounded-full

              px-4
              py-2

              text-xs
              font-semibold

              text-white
            "
            style={{
              background: "var(--primary)",
            }}
          >
            Featured
          </span>
        )}

      </div>

      {/* Content */}

      <div className="p-6">

        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {description}
        </p>

        {/* Reward Info */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Coins
                size={18}
                style={{
                  color: "var(--primary)",
                }}
              />

              <span className="text-slate-500">
                Required Points
              </span>

            </div>

            <span
              className="font-bold"
              style={{
                color: "var(--primary)",
              }}
            >
              {pointsRequired}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Clock3
                size={18}
                className="text-slate-400"
              />

              <span className="text-slate-500">
                Valid Until
              </span>

            </div>

            <span className="font-medium">
              {expiresOn}
            </span>

          </div>

        </div>

        {/* Button */}

        <div className="mt-8">

          {redeemed ? (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2

                rounded-2xl

                bg-green-100

                py-4

                font-semibold

                text-green-700
              "
            >
              <CheckCircle2 size={20} />

              Redeemed
            </div>
          ) : available ? (
            <button
              onClick={() => onRedeem?.(gift)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3

                rounded-2xl

                py-4

                font-semibold

                text-white

                transition-all

                hover:scale-[1.02]
              "
              style={{
                background: "var(--primary)",
              }}
            >
              <Gift size={20} />

              Redeem Gift

              <Sparkles size={18} />
            </button>
          ) : (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2

                rounded-2xl

                bg-slate-100

                py-4

                font-semibold

                text-slate-500
              "
            >
              <Lock size={18} />

              Not Enough Points
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export default GiftCard;