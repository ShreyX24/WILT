import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/themeContext";
import { BackBtn } from "../../../components/backBtn";
import { HistoryTopic } from "../../../components/sidebar/historyLayout/historyTopic";

export const SidebarMobile = () => {
  const { themeOptions, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className=" h-screen w-screen md:hidden"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        borderColor: themeOptions.borderColor,
        color: themeOptions.color,
      }}
    >
      {/* Back Btn */}
      <BackBtn />

      {/* History Seciton */}
      <section className="h-[50vh] w-full">
        <div className="w-full p-4 gap-2 flex justify-center items-center">
          {theme ? (
            <img
              src="/assets/icons/history_light.png"
              alt=""
              height="28"
              width="28"
            />
          ) : (
            <img
              src="/assets/icons/history.png"
              alt=""
              height="28"
              width="28"
            />
          )}
          <span className="text-3xl fontSuse">History</span>
        </div>
        <HistoryTopic />
      </section>
      <div className="absolute top-0 right-0 p-4 py-6">
        <button
          className="flex justify-center items-center p-[2px] rounded-md"
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
          onClick={() => navigate("/calendar")}
        >
          {theme ? (
            <img src="/assets/icons/calendar_light.png" alt="" width="25" />
          ) : (
            <img src="/assets/icons/calendar.png" alt="" width="25" />
          )}
        </button>
      </div>

      {/* Calendar Section */}
      {/* <section className="h-[50vh] w-full">
        <div className="w-full p-4 gap-2 flex justify-center items-center">
          {theme ? (
            <img
              src="/assets/icons/calendar_light.png"
              alt=""
              height="28"
              width="28"
            />
          ) : (
            <img
              src="/assets/icons/calendar.png"
              alt=""
              height="28"
              width="28"
            />
          )}
          <span className="text-3xl fontSuse">Calendar</span>
        </div>
      </section> */}
    </div>
  );
};
