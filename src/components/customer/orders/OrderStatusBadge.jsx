const statusConfig = {
  pending: {
    label: "Pending",
    bg: "#FEF3C7",
    color: "#B45309",
  },

  confirmed: {
    label: "Confirmed",
    bg: "#DBEAFE",
    color: "#1D4ED8",
  },

  preparing: {
    label: "Preparing",
    bg: "#EDE9FE",
    color: "#6D28D9",
  },

  ready: {
    label: "Ready",
    bg: "#DCFCE7",
    color: "#15803D",
  },

  delivery: {
    label: "Out for Delivery",
    bg: "#E0F2FE",
    color: "#0369A1",
  },

  delivered: {
    label: "Delivered",
    bg: "#DCFCE7",
    color: "#15803D",
  },

  cancelled: {
    label: "Cancelled",
    bg: "#FEE2E2",
    color: "#B91C1C",
  },

  refunded: {
    label: "Refunded",
    bg: "#F3F4F6",
    color: "#4B5563",
  },
};

const OrderStatusBadge = ({
  status = "pending",
  size = "default",
}) => {
  const current =
    statusConfig[status] || statusConfig.pending;

  const sizes = {
    small: "px-3 py-1 text-xs",

    default: "px-4 py-2 text-sm",

    large: "px-5 py-2.5 text-base",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center

        rounded-full

        font-semibold

        whitespace-nowrap

        ${sizes[size]}
      `}
      style={{
        background: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
};

export default OrderStatusBadge;