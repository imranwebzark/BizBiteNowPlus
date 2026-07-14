import { motion } from "framer-motion";
import {
  Coins,
  Crown,
  Gift,
  Sparkles,
  ChevronRight,
  Trophy,
} from "lucide-react";

const tierColors = {
  Bronze: "#CD7F32",
  Silver: "#9CA3AF",
  Gold: "#FACC15",
  Platinum: "#8B5CF6",
};

const LoyaltyCard = ({
  points = 2450,
  tier = "Gold",
  nextTier = "Platinum",
  pointsToNextTier = 550,
  progress = 82,
  expiringPoints = 120,
  onViewBenefits,
  onRedeem,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative
        overflow-hidden

        rounded-[32px]

        shadow-xl

        text-white
      "
      style={{
        background:
          "linear-gradient(135deg,var(--primary),#111827)",
      }}
    >
      {/* Background */}

      <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full bg-white/10" />

      <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative p-7">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-white/70">
              Loyalty Balance
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {points.toLocaleString()}
            </h2>

            <p className="mt-2 text-white/70">
              Available Reward Points
            </p>

          </div>

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-full

              bg-white/15

              backdrop-blur
            "
          >
            <Coins size={38} />
          </div>

        </div>

        {/* Tier */}

        <div
          className="
            mt-8

            rounded-3xl

            bg-white/10

            p-5

            backdrop-blur
          "
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Crown
                size={24}
                color={
                  tierColors[tier] || "#fff"
                }
              />

              <div>

                <h3 className="text-xl font-bold">
                  {tier} Member
                </h3>

                <p className="text-sm text-white/70">
                  Premium Loyalty Member
                </p>

              </div>

            </div>

            <Trophy size={28} />
          </div>

          {/* Progress */}

          <div className="mt-6">

            <div className="mb-3 flex justify-between text-sm">

              <span>{tier}</span>

              <span>{nextTier}</span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/20">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full rounded-full bg-white"
              />

            </div>

            <p className="mt-3 text-sm text-white/70">
              {pointsToNextTier} more points to unlock{" "}
              {nextTier}.
            </p>

          </div>

        </div>

        {/* Expiring */}

        {expiringPoints > 0 && (
          <div
            className="
              mt-6

              rounded-2xl

              bg-white/10

              p-4
            "
          >
            <div className="flex items-center gap-3">

              <Sparkles size={20} />

              <div>

                <h4 className="font-semibold">
                  {expiringPoints} Points Expiring Soon
                </h4>

                <p className="text-sm text-white/70">
                  Redeem before they expire.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Quick Stats */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <div
            className="
              rounded-2xl

              bg-white/10

              p-5

              backdrop-blur
            "
          >
            <Gift size={22} />

            <h4 className="mt-3 text-2xl font-bold">
              8
            </h4>

            <p className="text-sm text-white/70">
              Rewards Available
            </p>

          </div>

          <div
            className="
              rounded-2xl

              bg-white/10

              p-5

              backdrop-blur
            "
          >
            <Crown size={22} />

            <h4 className="mt-3 text-2xl font-bold">
              3
            </h4>

            <p className="text-sm text-white/70">
              Tier Benefits Active
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={onRedeem}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-3

              rounded-2xl

              bg-white

              px-6
              py-4

              font-semibold

              text-slate-900

              transition

              hover:scale-[1.02]
            "
          >
            <Gift size={20} />

            Redeem Rewards
          </button>

          <button
            onClick={onViewBenefits}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-3

              rounded-2xl

              border
              border-white/20

              bg-white/10

              px-6
              py-4

              font-semibold

              backdrop-blur

              transition

              hover:bg-white/20
            "
          >
            View Benefits

            <ChevronRight size={18} />
          </button>

        </div>

      </div>
    </motion.section>
  );
};

export default LoyaltyCard;