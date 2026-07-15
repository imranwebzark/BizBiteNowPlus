import { Search, SlidersHorizontal, X } from "lucide-react";

const OrderSearchFilter = ({
  search,
  setSearch,
  onFilterClick,
  onClearSearch,
}) => {
  return (
    <div className="flex items-center gap-3">

      {/* Search */}
      <div className="relative w-[340px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-11
            pr-10
            text-sm
            outline-none
            transition
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-100
          "
        />

        {/* Clear Search */}
        {search && (
          <button
            onClick={onClearSearch}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-red-500
            "
          >
            <X size={18}/>
          </button>
        )}

      </div>


      {/* Filter */}
      <button
        onClick={onFilterClick}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          text-sm
          font-medium
          transition
          hover:bg-slate-50
        "
      >
        <SlidersHorizontal size={18}/>
        Filter
      </button>

    </div>
  );
};

export default OrderSearchFilter;