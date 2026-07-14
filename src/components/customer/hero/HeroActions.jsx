import {
  UtensilsCrossed,
  CalendarDays,
  ReceiptText,
  Gift,
  MapPin,
  PhoneCall,
} from "lucide-react";

const HeroActions = ({
  onMenu,
  onBookTable,
  onOrders,
  onRewards,
  onDirections,
  onCall,
}) => {
  const actions = [
    {
      id: 1,
      title: "Menu",
      subtitle: "Browse dishes",
      icon: UtensilsCrossed,
      action: onMenu,
    },

    {
      id: 3,
      title: "Orders",
      subtitle: "Track order",
      icon: ReceiptText,
      action: onOrders,
    },
    {
      id: 4,
      title: "Rewards",
      subtitle: "Loyalty & gifts",
      icon: Gift,
      action: onRewards,
    },
    {
      id: 5,
      title: "Directions",
      subtitle: "Visit store",
      icon: MapPin,
      action: onDirections,
    },
    {
      id: 6,
      title: "Call",
      subtitle: "Contact us",
      icon: PhoneCall,
      action: onCall,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {actions.map(({ id, title, subtitle, icon: Icon, action }) => (
        <button
          key={id}
          onClick={action}
          className="
            group

            flex
            flex-col
            items-center
            justify-center

            rounded-[24px]

            border
            border-slate-200

            bg-white

            p-5

            shadow-sm

            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div
            className="
              mb-4

              flex
              h-16
              w-16

              items-center
              justify-center

              rounded-2xl

              transition-all
              duration-300
            "
            style={{
              background: "var(--primary-light)",
            }}
          >
            <Icon
              size={28}
              style={{
                color: "var(--primary)",
              }}
            />
          </div>

          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-center text-xs text-slate-500">
            {subtitle}
          </p>
        </button>
      ))}
    </section>
  );
};

export default HeroActions;