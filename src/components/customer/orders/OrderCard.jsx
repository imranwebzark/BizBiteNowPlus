import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
} from "lucide-react";

const statusStyle = {
  Delivered:
    "bg-green-100 text-green-700",

  Ongoing:
    "bg-orange-100 text-orange-600",

  Cancelled:
    "bg-red-100 text-red-600",
};

const OrderCard = ({
  order,
  
  onView,
  onReorder,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:shadow-md
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <img
            src={order.image}
            alt={order.restaurant}
            className="
              h-20
              w-20
              rounded-xl
              object-cover
            "
          />

          <div>

            <h3 className="text-lg font-bold text-slate-900">
              {order.restaurant}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Order #{order.id}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

              <span className="flex items-center gap-1">
                <CalendarDays size={16} />
                {order.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={16} />
                {order.time}
              </span>

            </div>

          </div>

        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyle[order.status]}
          `}
        >
          {order.status}
        </span>

      </div>

      {/* Divider */}

      <div className="my-5 border-t border-slate-200" />

      {/* Bottom */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {order.items} Items
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            ₹ {order.total}
          </h2>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
  onClick={onReorder}
  className="
    rounded-xl
    bg-green-900
    px-5
    py-2.5
    text-white
    font-semibold
    hover:bg-green-800
  "
>
  Reorder
</button>

       <button
  onClick={(e) => {
    e.stopPropagation();
    onView();
  }}
  className="
    rounded-xl
    border
    border-slate-300
    px-5
    py-2.5
    text-sm
    font-semibold
    hover:bg-slate-50
  "
>
  View Details
</button>

          {order.status === "Delivered" && (
            <button
              onClick={onReorder}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5
                py-2.5
                text-white
              "
            >
              Reorder

              <ChevronRight size={18} />
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default OrderCard;