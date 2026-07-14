import {
  ChevronRight,
  RotateCcw,
  Receipt,
  Clock3,
  Star,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

const statusColor = {
  Delivered: "#16A34A",
  Preparing: "#F59E0B",
  Confirmed: "#2563EB",
  Cancelled: "#DC2626",
  "Out for Delivery": "#7C3AED",
};

const OrderCard = ({
  order,
  onView,
  onReorder,
  onRate,
}) => {
  if (!order) return null;

  return (
    <Card
      padding="none"
      className="overflow-hidden"
    >
      {/* Header */}

      <div className="border-b border-slate-100 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Order ID
            </p>

            <h3 className="mt-1 text-lg font-bold text-slate-900">
              {order.id}
            </h3>
          </div>


        </div>
      </div>

      {/* Products */}

      <div className="space-y-4 p-5">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="
                h-16
                w-16
                rounded-2xl
                object-cover
              "
            />

            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">
                {item.name}
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Qty : {item.quantity}
              </p>
            </div>

            <span className="font-bold text-slate-900">
              ₹{item.total}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-slate-100
          bg-slate-50
          p-5
        "
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left */}

<div className="flex items-center gap-2 text-sm text-slate-500">
  <Clock3 size={15} />
  {order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "--"}
</div>

<div className="flex items-center gap-2">
  <Receipt
    size={16}
    style={{
      color: "var(--primary)",
    }}
  />

<span className="font-semibold text-slate-900">
  ₹{(order.summary?.total ?? 0).toLocaleString("en-IN")}
</span>
</div>
       

          {/* Right */}

          <div className="flex flex-wrap gap-3">
            {order.status === "Delivered" && (
              <>
                <SecondaryButton
                  icon={Star}
                  onClick={() => onRate?.(order)}
                  size="sm"
                >
                  Rate
                </SecondaryButton>

                <PrimaryButton
                  icon={RotateCcw}
                  onClick={() =>
                    onReorder?.(order)
                  }
                  size="sm"
                >
                  Reorder
                </PrimaryButton>
              </>
            )}

            <SecondaryButton
              icon={ChevronRight}
              onClick={() => onView?.(order)}
              size="sm"
            >
              Details
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;