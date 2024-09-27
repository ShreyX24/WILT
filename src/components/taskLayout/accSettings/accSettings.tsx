import React from "react";
import { BackBtn } from "../../backBtn";
import { useTheme } from "../../../contexts/themeContext";
import { SettingsItemComp } from "./settingsComp";
import { useGoogleAuth } from "../../../contexts/googleAuthContext";
import { NavLink } from "react-router-dom";

export const AccSettings = () => {
  const { themeOptions, theme } = useTheme();
  const { isLoggedIn, GoogleUserInfo, logout } = useGoogleAuth();

  return (
    <div
      className="h-screen w-screen bg-slate-300"
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
          <span className="text-3xl fontSuse">Account Settings</span>
        </div>

        <span className="flex items-center justify-center">
          {isLoggedIn && GoogleUserInfo ? (
            <span>
              Logged in as{" "}
              <span className="font-bold">{GoogleUserInfo.name}</span>
            </span>
          ) : (
            "Not Logged In Yet..."
          )}
        </span>

        {/* Setting items */}
        <div className=" h-[80%] flex flex-col items-center justify-center text-3xl font-semibold">
          <ul className="flex flex-col items-start justify-center gap-10">
            {isLoggedIn ? (
              <></>
            ) : (
              <SettingsItemComp
                to="/login"
                src_light="/assets/icons/login_light.png"
                src="/assets/icons/login.png"
                width="24"
                itemName="LogIn"
              />
            )}
            {isLoggedIn ? (
              <></>
            ) : (
              <SettingsItemComp
                to="/signUp"
                src_light="/assets/icons/addUser_light.png"
                src="/assets/icons/addUser.png"
                width="24"
                itemName="SignUp"
              />
            )}
            {/* <SettingsItemComp
              to="/signUp"
              src_light="/assets/icons/login_light.png"
              src="/assets/icons/login.png"
              width="24"
              itemName="LogIn"
            /> */}
            {isLoggedIn ? (
              <li
                className="hover:outline-dashed cursor-pointer px-2"
                onClick={() => logout()}
              >
                <NavLink to={"/"} className="flex items-center gap-1">
                  {theme ? (
                    <img
                      src="/assets/icons/logoff_light.png"
                      alt=""
                      width="24"
                    />
                  ) : (
                    <img src="/assets/icons/logoff.png" alt="" width="24" />
                  )}
                  LogOut
                </NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};
