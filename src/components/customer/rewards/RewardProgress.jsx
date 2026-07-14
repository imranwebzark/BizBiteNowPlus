import { motion } from "framer-motion";
import {
  Lock,
  CheckCircle2,
  Crown,
  ChevronRight,
} from "lucide-react";

const RewardProgress = ({
  currentTier = "Gold",
  currentPoints = 2450,
  tiers = [
    {
      name: "Bronze",
      required: 0,
      benefits: "5% Cashback",
    },
    {
      name: "Silver",
      required: 1000,
      benefits: "Free Delivery",
    },
    {
      name: "Gold",
      required: 2000,
      benefits: "Priority Support",
    },
    {
      name: "Platinum",
      required: 3000,
      benefits: "VIP Exclusive Rewards",
    },
  ],
}) => {
  return (
    <section
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Membership Journey
        </h2>

        <p className="mt-2 text-slate-500">
          Unlock more rewards as you earn points.
        </p>
      </div>

      {/* Timeline */}

      <div className="relative">

        <div
          className="
            absolute
            left-6
            top-0
            bottom-0

            w-1

            rounded-full

            bg-slate-200
          "
        />

        <div className="space-y-10">

          {tiers.map((tier, index) => {
            const unlocked =
              currentPoints >= tier.required;

            const active =
              tier.name === currentTier;

            return (
              <motion.div
                key={tier.name}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="relative flex gap-6"
              >
                {/* Icon */}

                <div
                  className="
                    relative
                    z-10

                    flex
                    h-14
                    w-14
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border-4
                    border-white

                    shadow-lg
                  "
                  style={{
                    background: unlocked
                      ? "var(--primary)"
                      : "#E2E8F0",
                  }}
                >
                  {unlocked ? (
                    <CheckCircle2
                      size={26}
                      color="#fff"
                    />
                  ) : (
                    <Lock
                      size={24}
                      className="text-slate-500"
                    />
                  )}
                </div>

                {/* Card */}

                <div
                  className={`
                    flex-1

                    rounded-3xl

                    border

                    p-6

                    transition-all

                    ${
                      active
                        ? "shadow-xl"
                        : "shadow-sm"
                    }
                  `}
                  style={{
                    borderColor: active
                      ? "var(--primary)"
                      : "#E2E8F0",

                    background: active
                      ? "var(--primary-light)"
                      : "#fff",
                  }}
                >
                  <div className="flex items-center justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <Crown
                          size={22}
                          style={{
                            color: unlocked
                              ? "var(--primary)"
                              : "#64748B",
                          }}
                        />

                        <h3 className="text-xl font-bold text-slate-900">
                          {tier.name}
                        </h3>

                      </div>

                      <p className="mt-2 text-slate-500">
                        Unlock at{" "}
                        <strong>
                          {tier.required}
                        </strong>{" "}
                        points
                      </p>

                    </div>

                    {active && (
                      <span
                        className="
                          rounded-full

                          px-4
                          py-2

                          text-xs
                          font-semibold

                          text-white
                        "
                        style={{
                          background:
                            "var(--primary)",
                        }}
                      >
                        Current Tier
                      </span>
                    )}

                  </div>

                  {/* Benefits */}

                  <div
                    className="
                      mt-5

                      rounded-2xl

                      bg-slate-50

                      p-4
                    "
                  >
                    <p className="text-sm text-slate-500">
                      Membership Benefit
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                      <h4 className="font-semibold text-slate-900">
                        {tier.benefits}
                      </h4>

                      <ChevronRight
                        size={18}
                        className="text-slate-400"
                      />

                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default RewardProgress;