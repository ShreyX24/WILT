import React from "react";
import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../contexts/googleAuthContext";

export const Login = () => {
  const { themeOptions, theme } = useTheme();
  const { login, loginWithTest } = useGoogleAuth();
  const navigate = useNavigate();

  const handleLoginAsTestUser = () => {
    loginWithTest();
    navigate("/u/TestUser");
  };

  //Loging in with google and extracting user info
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          // console.log("User Info:", userInfo);

          login(userInfo);

          const username: string = userInfo.name;

          navigate(`/u/${username.replace(" ", "")}`); // Redirect to home page
          // Here you can handle the user info, e.g., save it to your app's state or send it to your backend
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div
      className="w-screen h-screen flex flex-col items-center gap-[100px] md:gap-[250px]"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        color: themeOptions.color,
      }}
    >
      {/* Logo */}
      <span
        id="appName"
        className="w-[400px] h-[120px] text-center text-[50px] md:w-[500px] md:text-[70px] fontSuse"
      >
        What I Learned{" "}
        <span className="text-[70px] md:text-[90px] fontSuse">Today</span>
      </span>

      <div className="flex flex-col w-full h-full items-center">
        <span className="text-[40px] md:text-[60px] fontSuse">Login</span>

        {/* form wrapper */}
        <div
          className="h-[50vh] w-[80%] flex flex-col rounded-md md:h-[40vh] md:w-[400px] items-center justify-center gap-3"
          style={{
            backgroundColor: themeOptions.formBgColor,
            color: themeOptions.formTextColor,
          }}
        >
          {/* Login with google btn*/}
          <button
            className="flex items-center gap-1 p-2 px-4 rounded-md"
            onClick={() => googleLogin()}
            style={{
              backgroundColor: themeOptions.backgroundColor,
              color: themeOptions.color,
            }}
          >
            <img src="/assets/icons/google.png" alt="" width="24" />
            <span className="font-semibold">Sign in with Google</span>
          </button>

          {/* other btns */}
          <div className="flex gap-2 items-center text-sm">
            {/*Login aa Test User */}
            <button
              id="testUserBtn"
              className="p-1 px-2 rounded-md"
              style={{
                backgroundColor: themeOptions.formTextBgColor,
                color: themeOptions.formSendTextColor,
              }}
              onClick={handleLoginAsTestUser}
            >
              Login As Test User?
            </button>

            {/* Divert to register */}
            <button
              onClick={() => navigate("/signUp")}
              className="p-1 px-2 rounded-md"
              style={{
                backgroundColor: themeOptions.formTextBgColor,
                color: themeOptions.formSendTextColor,
              }}
            >
              Not A User?
            </button>
          </div>
        </div>
      </div>

      {/* back to home link */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {theme ? (
          <img
            src="/assets/icons/back_light.png"
            alt=""
            height="24"
            width="24"
          />
        ) : (
          <img src="/assets/icons/back.png" alt="" height="24" width="24" />
        )}
        <span>Back to Home?</span>
      </div>
    </div>
  );
};
