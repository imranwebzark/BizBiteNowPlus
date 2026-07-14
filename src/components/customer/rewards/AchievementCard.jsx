import {
  Trophy,
  Lock,
  CheckCircle2,
  Gift,
  Sparkles,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import PrimaryButton from "../common/PrimaryButton";

const rarityStyles = {
  Common: {
    bg: "#F1F5F9",
    color: "#475569",
  },
  Rare: {
    bg: "#DBEAFE",
    color: "#2563EB",
  },
  Epic: {
    bg: "#EDE9FE",
    color: "#7C3AED",
  },
  Legendary: {
    bg: "#FEF3C7",
    color: "#D97706",
  },
};

const AchievementCard = ({
  achievement,
  onClaim,
}) => {
  if (!achievement) return null;

  const {
    title,
    description,
    icon,
    rarity = "Common",
    reward,
    progress = 0,
    unlocked = false,
    claimed = false,
  } = achievement;

  const style =
    rarityStyles[rarity] || rarityStyles.Common;

  return (
    <Card
      padding="none"
      className="overflow-hidden"
    >
      {/* Top */}

      <div
        className="relative p-6"
        style={{
          background: style.bg,
        }}
      >
        <div className="flex items-start justify-between">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white
              shadow-sm
            "
          >
            {icon || (
              <Trophy
                size={34}
                style={{
                  color: style.color,
                }}
              />
            )}
          </div>

          <Badge
            icon={false}
            className="bg-white"
            style={{
              color: style.color,
            }}
          >
            {rarity}
          </Badge>
        </div>

        <h3 className="mt-6 text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      {/* Body */}

      <div className="p-6">
        {/* Progress */}

        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Progress
          </span>

          <span className="font-semibold">
            {progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: "var(--primary)",
            }}
          />
        </div>

        {/* Reward */}

        <Card
          shadow="none"
          className="mt-6 bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <Gift
              size={22}
              style={{
                color: "var(--primary)",
              }}
            />

            <div>
              <p className="text-xs text-slate-500">
                Reward
              </p>

              <h4 className="font-semibold text-slate-900">
                {reward}
              </h4>
            </div>
          </div>
        </Card>

        {/* Footer */}

        <div className="mt-6">
          {claimed ? (
            <Badge
              variant="success"
              className="flex w-full justify-center py-4 text-base"
            >
              

              Claimed
            </Badge>
          ) : unlocked ? (
            <PrimaryButton
              fullWidth
              icon={Sparkles}
              onClick={() =>
                onClaim?.(achievement)
              }
            >
              Claim Reward
            </PrimaryButton>
          ) : (
            <Badge
              icon={false}
              className="flex w-full justify-center gap-2 bg-slate-100 py-4 text-base text-slate-500"
            >
              <Lock size={18} />

              Locked Achievement
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;