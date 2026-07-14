import { Leaf } from "lucide-react";


const options = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "veg",
    label: "Veg",
  },
  {
    id: "nonveg",
    label: "Non-Veg",
  },
];


const VegToggle = ({
  value = "all",
  onChange,
}) => {

  return (

    <div
      className="
        inline-flex

        items-center

        rounded-2xl

        border

        border-slate-200

        bg-white
        shadow-lg

        p-1
        

        shadow-sm
      "
    >

      {
        options.map(
          (option)=>{

            const active =
              value === option.id;


            return (

              <button

                key={option.id}

                onClick={() =>
                  onChange?.(
                    option.id
                  )
                }

                className="
                  flex

                  min-w-[95px]

                  items-center

                  justify-center

                  gap-2

                  rounded-xl

                  px-4

                  py-2.5

                  text-sm

                  font-semibold

                  transition-all

                  duration-300
                "

                style={{

                  background:
                    active
                    ?
                    "var(--primary)"
                    :
                    "transparent",


                  color:
                    active
                    ?
                    "#ffffff"
                    :
                    "#475569",

                }}

              >

                {
                  option.id !== "all" && (

                    <Leaf

                      size={15}

                      color={
                        option.id === "veg"
                        ?
                        "#16A34A"
                        :
                        "#DC2626"
                      }

                    />

                  )
                }


                {option.label}


              </button>

            );

          }
        )
      }


    </div>

  );

};


export default VegToggle;