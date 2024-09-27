import { useGoogleAuth } from "../../contexts/googleAuthContext";
import { useTheme } from "../../contexts/themeContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { themeOptions, toggleTheme, theme } = useTheme();
  const { isLoggedIn, GoogleUserInfo } = useGoogleAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center w-full md:px-10">
      {/* History Btn */}
      <div className="p-2">
        <button
          className="w-[35px] h-[35px] flex items-center justify-center rounded-md md:hidden"
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
          onClick={() => navigate("/mSideNav")}
        >
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
        </button>
      </div>

      {/* Mail Settings Btn */}
      <div className="p-2 flex gap-4 items-center">
        {/* <button
          className="flex items-center justify-center gap-1 p-1 md:px-2 rounded-md"
          onClick={() => navigate("/mailSub")}
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
        >
          {theme ? (
            <img
              src="/assets/icons/diamond_light.png"
              alt=""
              height="28"
              width="28"
            />
          ) : (
            <img
              src="/assets/icons/diamond.png"
              alt=""
              height="28"
              width="28"
            />
          )}
          <span className="hidden md:block">Email Subscription</span>
        </button> */}

        {/* Account Settings Btn */}
        {isLoggedIn ? (
          <button
            className="flex items-center justify-center gap-1 p-1 md:px-2 rounded-md"
            onClick={() => navigate("/accountSettings")}
            style={{
              borderColor: themeOptions.borderColor,
              backgroundColor: themeOptions.btnBackgroundColor,
            }}
          >
            <img
              className="rounded-md"
              src={GoogleUserInfo?.picture}
              alt=""
              height="28"
              width="28"
            />

            <span className="hidden md:block font-semibold">
              {GoogleUserInfo?.name}
            </span>
            {theme ? (
              <img src="/assets/icons/arrow-down_light.png" alt="" width="10" />
            ) : (
              <img src="/assets/icons/arrow-down.png" alt="" width="10" />
            )}
          </button>
        ) : (
          <button
            className="flex items-center justify-center gap-1 p-1 md:px-2 rounded-md"
            onClick={() => navigate("/accountSettings")}
            style={{
              borderColor: themeOptions.borderColor,
              backgroundColor: themeOptions.btnBackgroundColor,
            }}
          >
            {theme ? (
              <img
                src="/assets/icons/profile_light.png"
                alt=""
                height="28"
                width="28"
              />
            ) : (
              <img
                src="/assets/icons/profile.png"
                alt=""
                height="28"
                width="28"
              />
            )}
            <span className="hidden md:block">Account</span>
          </button>
        )}

        {/* Theme Btn */}
        <button
          className="w-[60px] h-[35px] flex items-center rounded-md "
          style={{
            borderColor: themeOptions.borderColor,
            backgroundColor: themeOptions.btnBackgroundColor,
          }}
          onClick={toggleTheme}
        >
          <div
            id="themeBtn"
            className="w-[calc(55px/2)] h-[28px] rounded-md"
            style={
              theme
                ? {
                    transform: "translateX(100%)",
                    backgroundColor: themeOptions.themeBtnBackgroundColor,
                  }
                : {
                    transform: "translateX(15%)",
                    backgroundColor: themeOptions.themeBtnBackgroundColor,
                  }
            }
          ></div>
        </button>
      </div>
    </nav>
  );
};
