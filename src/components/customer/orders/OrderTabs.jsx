import clsx from "clsx";

const tabs = [
  "All Orders",
  "Ongoing",
  "Delivered",
  "Cancelled",
];

const OrderTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-slate-200">
      <div className="flex items-center gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "relative pb-4 text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab
                ? "text-green-900"
                : "text-black hover:text-slate-900"
            )}
          >
            {tab}

            {activeTab === tab && (
              <span
                className="
                  absolute
                  left-0
                  bottom-0
                  h-[3px]
                  w-full
                  rounded-full
                  bg-green-900
                "
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;