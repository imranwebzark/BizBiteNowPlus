import { motion } from "framer-motion";
import {
  TicketPercent,
  Copy,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const CouponCard = ({
  coupon,
  copied = false,
  used = false,
  onCopy,
  onApply,
}) => {
  if (!coupon) return null;

  const expired = coupon.expired;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`
        relative
        overflow-hidden

        rounded-[30px]

        border

        bg-white

        shadow-sm

        ${
          expired
            ? "border-red-200 opacity-70"
            : "border-slate-200 hover:shadow-xl"
        }
      `}
    >
      {/* Decorative Circles */}

      <div className="absolute -left-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-100" />

      <div className="absolute -right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-100" />

      {/* Discount */}

      <div
        className="p-6"
        style={{
          background: "var(--primary-light)",
        }}
      >
        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-3">

              <TicketPercent
                size={28}
                style={{
                  color: "var(--primary)",
                }}
              />

              <div>

                <h2
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {coupon.discount}
                </h2>

                <p className="text-slate-500">
                  {coupon.title}
                </p>

              </div>

            </div>

          </div>

          {expired ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              Expired
            </span>
          ) : (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{
                background: "var(--primary)",
              }}
            >
              Active
            </span>
          )}

        </div>
      </div>

      {/* Details */}

      <div className="space-y-5 p-6">

        <p className="leading-6 text-slate-600">
          {coupon.description}
        </p>

        <div className="flex flex-wrap gap-3">

          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm">
            Min Order ₹{coupon.minOrder}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm">
            Max Saving ₹{coupon.maxDiscount}
          </span>

        </div>

        {/* Coupon Code */}

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            border-2
            border-dashed

            p-4
          "
          style={{
            borderColor: "var(--primary)",
          }}
        >
          <code
            className="text-lg font-bold tracking-wider"
            style={{
              color: "var(--primary)",
            }}
          >
            {coupon.code}
          </code>

          <button
            onClick={() => onCopy?.(coupon.code)}
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-slate-100

              px-4
              py-2

              transition

              hover:bg-slate-200
            "
          >
            {copied ? (
              <>
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Clock3 size={16} />

            Expires {coupon.expiry}

          </div>

{!expired && (
  <button
    disabled={used}
    onClick={() => !used && onApply?.(coupon)}
    className="
      rounded-xl
      px-5
      py-3
      font-semibold
      text-white
      transition
      disabled:cursor-not-allowed
      disabled:bg-slate-300
    "
    style={{
      background: used ? "#CBD5E1" : "var(--primary)",
    }}
  >
    {used ? "Used" : "use"}
  </button>
)}

        </div>

      </div>
    </motion.div>
  );
};

export default CouponCard;