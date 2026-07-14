import { Link } from "react-router-dom";
import DashboardWidget from "../../DashboardWidget";
import EmptyState from "../../../UI/EmptyState";
import ActivityItem from "./ActivityItem";
import { activities } from "../../../../data/dashboardData";

const RecentActivity = () => {
  return (
    <DashboardWidget
      title="Recent Activity"
      subtitle="Latest updates from your business"

    >
      {activities.length === 0 ? (
        <EmptyState
          title="No activity yet"
          description="Business activity will appear here."
        />
      ) : (
<div className="max-h-[420px] overflow-y-auto scrollbar-hide pr-1">
  {activities.map((activity, index) => (
    <ActivityItem
      key={activity.id}
      activity={activity}
      isLast={index === activities.length - 1}
    />
  ))}
</div>
      )}
    </DashboardWidget>
  );
};

export default RecentActivity;