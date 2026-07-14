import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import QuantitySelector from "./QuantitySelector";

const AddToCartBar = ({
  quantity = 1,
  total = 0,
  loading = false,
  disabled = false,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <div
      className="
        fixed
        left-0
        right-0

        bottom-[82px]
        sm:bottom-5

        z-40

        px-3
        sm:px-5
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl

          rounded-3xl

          border
          border-slate-200

          bg-white/95
          backdrop-blur-xl

          shadow-2xl

          p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          {/* Total */}

          <div className="shrink-0">
            <p className="text-xs font-medium text-slate-500">
              Total
            </p>

            <h2 className="text-2xl font-black text-slate-900">
              ₹{total}
            </h2>

            <p className="text-xs text-slate-400">
              Quantity : {quantity}
            </p>
          </div>

          {/* Right Side */}

          <div
            className="
              flex
              items-center
              gap-3
              flex-1
              justify-end
            "
          >
            <QuantitySelector
              quantity={quantity}
              onChange={onQuantityChange}
            />

            <button
              disabled={disabled || loading}
              onClick={onAddToCart}
              className="
                flex
                items-center
                justify-center
                gap-2

                rounded-2xl

                px-6
                py-3.5

                font-bold
                text-white

                shadow-lg

                transition-all

                hover:opacity-90

                disabled:opacity-50
                disabled:cursor-not-allowed
              "
              style={{
                background: "var(--primary)",
              }}
            >
              <ShoppingBag size={18} />

              {loading
                ? "Adding..."
                : "Add to Cart"}

              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartBar;