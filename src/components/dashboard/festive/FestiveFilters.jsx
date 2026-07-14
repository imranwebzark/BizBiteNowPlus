import { Search, Filter, CalendarRange } from "lucide-react";
import { festiveStatus } from "../../../data/festiveMenuData";

const festivals = [
  "All",
  "Diwali",
  "Christmas",
  "Eid",
  "Holi",
  "Navratri",
  "New Year",
];

export default function FestiveFilters({
  search = "",
  setSearch,
  onSearchChange,

  status = "All",
  setStatus,
  onStatusChange,

  festival = "All",
  setFestival,
  onFestivalChange,
}) {

  const handleSearchChange =
    typeof setSearch === "function"
      ? setSearch
      : onSearchChange;

  const handleStatusChange =
    typeof setStatus === "function"
      ? setStatus
      : onStatusChange;

  const handleFestivalChange =
    typeof setFestival === "function"
      ? setFestival
      : onFestivalChange;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm border-slate-700 900">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              handleSearchChange?.(e.target.value)
            }
            placeholder="Search festive menu..."
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#1A4D2E] focus:ring-4 focus:ring-[#1A4D2E]/10 border-slate-700 900"
          />
        </div>

        {/* Status */}

        <div className="flex flex-wrap gap-2">
      {festiveStatus.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleStatusChange?.(item)}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            status === item
              ? "bg-[#1A4D2E] text-white shadow-md"
              : "border border-slate-200 bg-white text-slate-600 hover:border-[#1A4D2E] hover:text-[#1A4D2E] border-slate-700 900 text-slate-300"
          }`}
        >
          {item === "All"
            ? "All"
            : item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
              </div>

        {/* Festival */}

        <div className="relative">
          <CalendarRange
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={festival}
            onChange={(e) =>
              handleFestivalChange?.(e.target.value)
            }
            className="h-12 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm outline-none transition-all duration-300 focus:border-[#1A4D2E] focus:ring-4 focus:ring-[#1A4D2E]/10 border-slate-700 900"
          >
            {festivals.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "All" ? "All Festivals" : item}
              </option>
            ))}
          </select>

          <Filter
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

      </div>
    </div>
  );
}