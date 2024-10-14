import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../contexts/googleAuthContext";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

interface UserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export const Login = () => {
  const { themeOptions, theme } = useTheme();
  const { login, loginWithTest } = useGoogleAuth();
  const navigate = useNavigate();
  const [googleLoginError, setGoogleLoginError] = useState(false);

  const handleLoginAsTestUser = () => {
    loginWithTest();
    navigate("/u/TestUser");
  };

  const handleLoginWithGoogle = (token: string | undefined) => {
    if (token) {
      const decoded = jwtDecode(token) as any;
      console.log(decoded);
      const userInfo: UserInfo = {
        sub: decoded.sub,
        name: decoded.name,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        picture: decoded.picture,
        email: decoded.email,
        email_verified: decoded.email_verified,
      };
      console.log(userInfo);

      login(userInfo);

      const username: string = userInfo.name;

      navigate(`/u/${username.replace(" ", "")}`); // Redirect to home page
    }
  };

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

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              handleLoginWithGoogle(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
              setGoogleLoginError(true);
            }}
            useOneTap
          />

          {/* other btns */}
          <div className="flex gap-2 items-center text-sm">
            {/*Login aa Test User */}
            <button
              className="p-1 px-2 rounded-md font-bold"
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

          {googleLoginError ? (
            <span className="text-red-600 text-center">
              An error occured while logging in. Please try again.
            </span>
          ) : (
            <></>
          )}
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
