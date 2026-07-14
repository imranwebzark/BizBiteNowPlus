import DashboardHero from "../../../components/dashboard/DashboardHero";
import StatsCard from "../../../components/dashboard/StatsCard";
import SalesChart from "../../../components/dashboard/analytics/SalesChart";
import QuickActions from "../../../components/dashboard/widgets/QuickActions/QuickActions";
import PremiumLockCard from "../../../components/common/PremiumLockCard";

import { motion } from "framer-motion";
import { stats } from "../../../data/dashboardData";

// Example
const user = {
  subscription: "free",
};

export default function SellerDashboard() {
  const isPlus = user.subscription === "plus";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >


      <DashboardHero />

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.id}
            {...item}
          />
        ))}
      </section>

      {isPlus ? (
        <QuickActions />
      ) : (
        <PremiumLockCard
          title="Quick Actions"
          description="Upgrade to BizBite Plus to unlock premium dashboard shortcuts."
        />
      )}

      {isPlus ? (
        <SalesChart />
      ) : (
        <PremiumLockCard
          title="Sales Analytics"
          description="Sales charts and analytics are available only with BizBite Plus."
        />
      )}
    </motion.div>
  );
}