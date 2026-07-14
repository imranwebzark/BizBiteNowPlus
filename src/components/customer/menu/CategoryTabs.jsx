import { useState } from "react";
import {
  ChevronDown,
  Check,
} from "lucide-react";

import Chip from "../common/Chip";


const CategoryTabs = ({
  categories = [],
  activeCategory = "",
  onChange,
}) => {

  const [open, setOpen] = useState(false);


  const selectedCategory =
    categories.find(
      (item) =>
        item.id === activeCategory
    ) || categories[0];


  return (

    <div
      className="
        sticky
        top-20
        z-30

        px-4
        py-3

        lg:px-6
      "
    >

      <div
        className="
          relative

          flex

          items-center

          justify-between

          rounded-3xl

          border

          border-slate-200

          bg-white/90

          backdrop-blur-xl

          px-4

          py-3

          shadow-lg
        "
      >

        {/* Selected Category */}

        <button
          onClick={() =>
            setOpen(!open)
          }

          className="
            flex

            items-center

            gap-3

            rounded-2xl

            px-4
            bg-slate-200
            py-2

            transition

            hover:bg-green-900
            hover:text-white
          "
        >

          <span className="text-lg">
            {selectedCategory?.icon}
          </span>


          <span
            className="
              text-sm

              font-bold
              
              
            "
          >
            {selectedCategory?.name}
          </span>


          <ChevronDown
            size={18}
            className={`
              transition-transform
              duration-300

              ${
                open
                ? "rotate-180"
                : ""
              }
            `}
          />

        </button>



        {/* Quick Info */}

        <span
          className="
            hidden

            sm:block

            text-sm

            text-slate-500
          "
        >
          {categories.length} categories
        </span>



        {/* Dropdown */}

        {
          open && (

            <div
              className="
                absolute

                left-0

                top-full

                mt-3

                w-full

                rounded-3xl

                border

                border-slate-200

                bg-white

                p-3

                shadow-2xl

                overflow-hidden
              "
            >

              <div
                className="
                  grid

                  grid-cols-2

                  gap-3

                  sm:grid-cols-3

                  lg:grid-cols-4
                "
              >

                {
                  categories.map(
                    (category)=>{

                      const active =
                        category.id === activeCategory;


                      return (

                        <button

                          key={category.id}

                          onClick={()=>{
                            onChange?.(
                              category.id
                            );

                            setOpen(false);
                          }}

                          className={`
                            flex

                            items-center

                            justify-between

                            gap-3

                            rounded-2xl

                            px-4

                            py-3

                            text-sm

                            font-semibold

                            transition-all

                            ${
                              active
                              ?
                              "text-white shadow-md"
                              :
                              "bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }
                          `}

                          style={{
                            background:
                              active
                              ?
                              "var(--primary)"
                              :
                              undefined,
                          }}

                        >

                          <div
                            className="
                              flex

                              items-center

                              gap-2
                            "
                          >

                            <span>
                              {category.icon}
                            </span>


                            {category.name}

                          </div>



                          {
                            active && (

                              <Check
                                size={16}
                              />

                            )
                          }


                        </button>

                      );

                    }
                  )
                }


              </div>


            </div>

          )
        }


      </div>


    </div>

  );

};


export default CategoryTabs;