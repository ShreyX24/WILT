import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../contexts/googleAuthContext";

export const Register = () => {
  const { themeOptions, theme } = useTheme();
  const navigate = useNavigate();
  const { setIsLoggedIn, setGoogleUserInfo } = useGoogleAuth();

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
          console.log("User Info:", userInfo);

          setIsLoggedIn(true); // Set login state to true
          setGoogleUserInfo(userInfo);
          navigate("/"); // Redirect to home page
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
        <span className="text-[40px] md:text-[60px] fontSuse">SignUp</span>

        {/* form wrapper */}
        <div
          className="h-[50vh] w-[80%] flex flex-col rounded-md md:h-[40vh] md:w-[400px] items-center justify-center gap-3"
          style={{
            backgroundColor: themeOptions.formBgColor,
            color: themeOptions.formTextColor,
          }}
        >
          {/* <form
            className="flex flex-col items-center justify-center p-10 gap-4"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const form = e.currentTarget;
              const username = form.username.value;
              const email = form.email.value;
              console.log("Username:", username);
              console.log("Email:", email);
            }}
          >
            <label className="text-sm flex flex-col">
              Username
              <input
                type="text"
                name="username"
                className="text-lg rounded-md p-1 outline-none"
                style={{
                  backgroundColor: themeOptions.formInputBgColor,
                  color: themeOptions.formInputTextColor,
                }}
              />
            </label>
            <label className="text-sm flex flex-col">
              Email
              <input
                type="text"
                name="email"
                className="text-lg rounded-md p-1 outline-none"
                style={{
                  backgroundColor: themeOptions.formInputBgColor,
                  color: themeOptions.formInputTextColor,
                }}
              />
            </label>
            <label className="text-sm flex flex-col">
              Password
              <input
                type="password"
                name="email"
                className="text-lg rounded-md p-1 outline-none"
                style={{
                  backgroundColor: themeOptions.formInputBgColor,
                  color: themeOptions.formInputTextColor,
                }}
              />
            </label>
            <button
              className="flex items-center justify-center gap-1 text-xl font-semibold rounded-md p-2"
              type="submit"
              style={{
                backgroundColor: themeOptions.formSendBgColor,
              }}
            >
              Register
            </button>
          </form> */}

          {/* SignUp with google btn*/}
          <button
            className="flex items-center gap-1 p-2 px-4 rounded-md"
            onClick={() => googleLogin()}
            style={{
              backgroundColor: themeOptions.backgroundColor,
              color: themeOptions.color,
            }}
          >
            <img src="/assets/icons/google.png" alt="" width="24" />
            <span className="font-semibold">Sign up with Google</span>
          </button>

          {/* Divert to login */}
          <div className=" flex gap-2 items-center text-sm">
            <button
              onClick={() => navigate("/login")}
              className="p-1 px-2 rounded-md"
              style={{
                backgroundColor: themeOptions.formTextBgColor,
                color: themeOptions.formSendTextColor,
              }}
            >
              Already A User?
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
