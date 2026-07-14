import { Check, Plus } from "lucide-react";

const Addons = ({
  groups = [],
  selected = {},
  onChange,
}) => {
  const toggleAddon = (groupId, addonId, multiple) => {
    const current = selected[groupId] || [];

    if (multiple) {
      if (current.includes(addonId)) {
        onChange?.({
          ...selected,
          [groupId]: current.filter((id) => id !== addonId),
        });
      } else {
        onChange?.({
          ...selected,
          [groupId]: [...current, addonId],
        });
      }
    } else {
      onChange?.({
        ...selected,
        [groupId]: [addonId],
      });
    }
  };

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section
          key={group.id}
          className="
            rounded-[28px]
            border
            border-slate-200
            bg-white
            p-6
          "
        >
          {/* Header */}

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {group.name}
              </h3>

              {group.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {group.description}
                </p>
              )}
            </div>

            {group.required && (
              <span
                className="
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-white
                "
                style={{
                  background: "var(--primary)",
                }}
              >
                Required
              </span>
            )}

          </div>

          {/* Addons */}

          <div className="space-y-4">

            {group.items.map((addon) => {
              const active =
                (selected[group.id] || []).includes(addon.id);

              return (
                <button
                  key={addon.id}
                  onClick={() =>
                    toggleAddon(
                      group.id,
                      addon.id,
                      group.multiple
                    )
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between

                    rounded-2xl

                    border

                    p-4

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
                  <div className="text-left">

                    <h4 className="font-semibold text-slate-900">
                      {addon.name}
                    </h4>

                    {addon.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {addon.description}
                      </p>
                    )}

                  </div>

                  <div className="flex items-center gap-5">

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
                </button>
              );
            })}

          </div>

        </section>
      ))}
    </div>
  );
};

export default Addons;