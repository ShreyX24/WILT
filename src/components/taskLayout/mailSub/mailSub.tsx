import React from "react";
import { BackBtn } from "../../backBtn";
import { useTheme } from "../../../contexts/themeContext";

export const MailSub = () => {
  const { themeOptions, theme } = useTheme();

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen bg-slate-300"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        borderColor: themeOptions.borderColor,
        color: themeOptions.color,
      }}
    >
      <BackBtn />
      {/* Acc Setting Section */}
      <section className="h-full w-full">
        <div className="w-full p-4 gap-2 flex justify-center items-center">
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
          <span className="text-3xl fontSuse">Mail Subscription</span>
        </div>
      </section>
    </div>
  );
};
