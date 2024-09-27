import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/themeContext";

export const SidebarCalendar = () => {
  const { themeOptions, theme } = useTheme();
  const navigate = useNavigate();

  const handleBackBtnClick = () => {
    navigate("/");
  };

  const handleHistoryBtnClick = () => {
    navigate("/mSideNav");
  };

  return (
    <div
      className=" h-screen w-screen md:hidden"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        borderColor: themeOptions.borderColor,
        color: themeOptions.color,
      }}
    >
      <div className="absolute top-0 left-0 p-4 py-6">
        <button
          className="flex justify-center items-center px-[2px] rounded-md"
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
          onClick={handleBackBtnClick}
        >
          {theme ? (
            <img
              src="/assets/icons/back_light.png"
              alt=""
              height="28"
              width="28"
            />
          ) : (
            <img src="/assets/icons/back.png" alt="" height="28" width="28" />
          )}
        </button>
      </div>
      {/* Calendar Seciton */}
      <section className="h-[50vh] w-full">
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
      </section>
      <div className="absolute top-0 right-0 p-4 py-6">
        <button
          className="flex justify-center items-center p-[2px] rounded-md"
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
          onClick={handleHistoryBtnClick}
        >
          {theme ? (
            <img src="/assets/icons/history_light.png" alt="" width="25" />
          ) : (
            <img src="/assets/icons/history.png" alt="" width="25" />
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
