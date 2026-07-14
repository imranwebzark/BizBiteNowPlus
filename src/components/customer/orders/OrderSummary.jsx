import {
  Receipt,
  Bike,
  Percent,
  Wallet,
  Coins,
} from "lucide-react";

const OrderSummary = ({
  subtotal = 0,
  deliveryFee = 0,
  tax = 0,
  packagingFee = 0,
  discount = 0,
  coupon = "",
  loyaltyPoints = 0,
  total = 0,
}) => {
  return (
    <section
      className="
        rounded-[30px]

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

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
          <Receipt size={22} />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Bill Details
          </h2>

          <p className="text-sm text-slate-500">
            Order price breakdown
          </p>

        </div>

      </div>

      {/* Bill */}

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Item Total
          </span>

          <span className="font-semibold">
            ₹{subtotal}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Bike
              size={17}
              className="text-slate-400"
            />

            <span className="text-slate-500">
              Delivery Fee
            </span>

          </div>

          <span className="font-semibold">
            ₹{deliveryFee}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Packaging Charges
          </span>

          <span className="font-semibold">
            ₹{packagingFee}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Taxes & GST
          </span>

          <span className="font-semibold">
            ₹{tax}
          </span>

        </div>

        {discount > 0 && (
          <div
            className="flex items-center justify-between"
            style={{
              color: "var(--primary)",
            }}
          >
            <div className="flex items-center gap-2">

              <Percent size={17} />

              Discount

            </div>

            <span className="font-semibold">
              - ₹{discount}
            </span>

          </div>
        )}

        {coupon && (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Wallet
                size={17}
                style={{
                  color: "var(--primary)",
                }}
              />

              <span className="text-slate-500">
                Coupon Applied
              </span>

            </div>

            <span
              className="font-semibold"
              style={{
                color: "var(--primary)",
              }}
            >
              {coupon}
            </span>

          </div>
        )}

        <div className="border-t border-dashed border-slate-200 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-lg font-bold">
              Grand Total
            </span>

            <span
              className="text-2xl font-bold"
              style={{
                color: "var(--primary)",
              }}
            >
              ₹{total}
            </span>

          </div>

        </div>

        {loyaltyPoints > 0 && (
          <div
            className="
              mt-5

              flex
              items-center
              gap-3

              rounded-2xl

              border

              p-4
            "
            style={{
              background: "var(--primary-light)",
              borderColor: "var(--primary-border)",
            }}
          >
            <Coins
              size={22}
              style={{
                color: "var(--primary)",
              }}
            />

            <div>

              <h4
                className="font-semibold"
                style={{
                  color: "var(--primary)",
                }}
              >
                You will earn {loyaltyPoints} points
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Redeem them on your next order.
              </p>

            </div>

          </div>
        )}

      </div>

    </section>
  );
};

export default OrderSummary;