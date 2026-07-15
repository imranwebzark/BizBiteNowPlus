import { Check, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Addons = ({
  addons = [],
  selectedAddons = [],
  onToggle,
}) => {
  return (

    <section className="space-y-5">

      {/* Header */}

      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Extra Addons
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Make your meal even better.
        </p>
      </div>

      {/* Addons List */}

      <div className="grid gap-4">

        {addons.map((addon) => {
          const active = selectedAddons.some(
            (item) => item.id === addon.id
          );

          return (
            <motion.button
              key={addon.id}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={() =>{
                  //  console.log(addon);
               onToggle(addon)
                
              }}
              className={`
                flex
                items-center
                justify-between

                rounded-3xl

                border

                p-5

                text-left

                transition-all
                duration-300

                ${
                  active
                    ? "shadow-lg"
                    : "hover:shadow-md border-slate-200"
                }
              `}
              style={{
                borderColor: active
                  ? "var(--primary)"
                  : undefined,

                background: active
                  ? "var(--primary-light)"
                  : "#fff",
              }}
            >
              <div>
                <h4 className="font-semibold text-slate-900">
                  {addon.name}
                </h4>

                {addon.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {addon.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">

                <span className="font-bold text-slate-900">
                  + ₹{addon.price}
                </span>

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full

                    border-2

                    transition-all

                    ${
                      active
                        ? "text-white"
                        : "border-slate-300"
                    }
                  `}
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "#fff",

                    borderColor: active
                      ? "var(--primary)"
                      : undefined,
                  }}
                >
                  {active ? (
                    <Check
                      size={16}
                      strokeWidth={3}
                    />
                  ) : (
                    <Plus size={16} />
                  )}
                </div>

              </div>
            </motion.button>
          );
        })}

        {addons.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              p-8
              text-center
              text-slate-500
            "
          >
            No addons available
          </div>
        )}

      </div>

    </section>
  );
};

export default Addons;