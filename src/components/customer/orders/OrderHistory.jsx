import { Clock3 } from "lucide-react";

const OrderHistoryCard = ({ order, onView }) => {
  if (!order) return null;

  return (
    <div
      onClick={() => onView?.(order)}
      className="
        rounded-[28px]

        border
        border-slate-200

        bg-white

        p-5
        hover:shadow-lg
        shadow-sm
      "
    >
      <div
        className="
          flex
          gap-4
        "
      >
        {/* Image */}

        <img
          src={order.items?.[0]?.image}
          alt={order.items?.[0]?.name}
          className="
            h-20
            w-20

            shrink-0

            rounded-2xl

            object-cover
          "
        />

        {/* Content */}

        <div
          className="
            flex-1
          "
        >
          <div
            className="
              flex

              items-start

              justify-between

              gap-3
            "
          >
            <div>
              <h3
                className="
                  font-bold

                  text-slate-900
                "
              >
                {order.items?.[0]?.name}
              </h3>

              <p
                className="
                  mt-1

                  text-sm

                  text-slate-500
                "
              >
                {order.date}
              </p>
            </div>

            <span
              className="
                rounded-full

                bg-slate-100

                px-3

                py-1.5

                text-xs

                font-semibold

                text-slate-700

                whitespace-nowrap
              "
            >
              {order.status}
            </span>
          </div>

          <div
            className="
              mt-4

              flex

              items-center

              justify-between
            "
          >
            <div
              className="
                flex

                items-center

                gap-2

                text-sm

                text-slate-500
              "
            >
              <Clock3 size={15} />
              {order.items?.length || 0} items
            </div>

            <p
              className="
                font-bold

                text-slate-900
              "
            >
              ₹{order.summary?.total || order.total}
            </p>
          </div>

          <button
            onClick={() => onView?.(order)}
            className="
              mt-4

              text-sm

              font-semibold

              text-green-700

              transition

              hover:underline
            "
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
