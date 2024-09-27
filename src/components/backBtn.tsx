import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const { themeOptions, theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 left-0 p-4 py-6">
      {/* back btn */}
      <button
        className="flex justify-center items-center px-[2px] rounded-md"
        style={{
          borderColor: themeOptions.borderColor,
          backgroundColor: themeOptions.btnBackgroundColor,
        }}
        onClick={() => navigate("/")}
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
  );
};
