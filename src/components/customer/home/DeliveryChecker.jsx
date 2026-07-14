import { MapPin, ArrowRight } from "lucide-react";

const DeliveryChecker = ({
  location = "",
  onCheck,
}) => {
  return (
    <section className="lg:hidden">
      <div
        className="
          relative
          overflow-hidden
          rounded-[14px]
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >
        {/* Decorative Background */}

        <div
          className="
            absolute
            -right-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-[var(--primary)]
            opacity-40
          "
        />
                <div
          className="
            absolute
            -left-15
            -bottom-12
            h-32
            w-32
            rounded-full
            bg-[var(--primary)]
            opacity-40
          "
        />

        <div className="relative  flex items-start gap-4">
          {/* Icon */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[10px]
            "
            style={{
              background: "var(--primary-light)",
            }}
          >
            <MapPin
              size={26}
              style={{
                color: "var(--primary)",
              }}
            />
          </div>

          {/* Content */}

          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              Delivery Available?
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Check whether we deliver to your location.
            </p>

            {location && (
              <div
                className="
                  mt-3
                  inline-flex
                  items-center
                  rounded-[10px]
                  bg-slate-100
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-700
                "
              >
                <MapPin className="text-red-500" size={16} /> {location}
              </div>
            )}
          </div>
        </div>

        {/* Button */}

        <button
          onClick={onCheck}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-[10px]
            py-3.5
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
          "
          style={{
            background: "var(--primary)",
          }}
        >
          Check Delivery

          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default DeliveryChecker;