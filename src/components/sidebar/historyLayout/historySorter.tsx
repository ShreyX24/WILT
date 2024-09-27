import React, { useState } from "react";
import { useTheme } from "../../../contexts/themeContext";

type SortType = "date" | "duration";

interface HistorySorterProps {
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
}

export const HistorySorter: React.FC<HistorySorterProps> = ({
  setSortType,
}) => {
  const { themeOptions, theme } = useTheme();
  const [activeDurationBtn, setActiveDurationBtn] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-[70px] md:h-[550px] justify-center items-center">
      <div
        className="w-full flex rounded-md justify-center"
        style={{ backgroundColor: themeOptions.historySorterBgColor }}
      >
        <div className="flex flex-col gap-2 py-2">
          {/* Sort By duration button */}
          <button
            className="flex gap-1 justify-center p-2 rounded-md "
            style={{ backgroundColor: themeOptions.historySorterBtnBgColor }}
            onClick={() => {
              setSortType("duration");
              setActiveDurationBtn(true);
            }}
          >
            {theme ? (
              <img src="/assets/icons/duration.png" alt="" width={30} />
            ) : (
              <img src="/assets/icons/duration_light.png" alt="" width={30} />
            )}
          </button>

          {/* Sort By date newest first */}
          <button
            className="flex gap-1 justify-center p-2 rounded-md"
            style={{ backgroundColor: themeOptions.historySorterBtnBgColor }}
            onClick={() => {
              setSortType("date");
              setActiveDurationBtn(false);
            }}
          >
            {theme ? (
              <>
                <img src="/assets/icons/date.png" alt="" width={30} />
              </>
            ) : (
              <>
                <img src="/assets/icons/date_light.png" alt="" width={30} />
              </>
            )}
          </button>
        </div>
        <div className="h-full">
          <div
            id="historySorterActiveBtn"
            className="w-[5px] h-[30px] bg-yellow-300 rounded-md"
            style={
              activeDurationBtn
                ? {
                    transform: "translateY(55%)",
                    backgroundColor:
                      themeOptions.historySorterActiveBtnSliderBgColor,
                  }
                : {
                    transform: "translateY(235%)",
                    backgroundColor:
                      themeOptions.historySorterActiveBtnSliderBgColor,
                  }
            }
          ></div>
        </div>
      </div>
    </div>
  );
};
