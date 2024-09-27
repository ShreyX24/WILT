import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { googleLogout } from "@react-oauth/google";
import { createNewUser, getUserData } from "./userActions";

interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

type GoogleAuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  GoogleUserInfo: GoogleUserInfo | null;
  setGoogleUserInfo: React.Dispatch<
    React.SetStateAction<GoogleUserInfo | null>
  >;
  login: (userData: GoogleUserInfo) => void;
  loginWithTest: () => void;
  logout: () => void;
};

interface GoogleAuthProviderProps {
  children: ReactNode;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | null>(null);

export const GoogleAuthProvider = ({ children }: GoogleAuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [GoogleUserInfo, setGoogleUserInfo] = useState<GoogleUserInfo | null>(
    null
  );

  // useEffect(() => {
  //   console.log(GoogleUserInfo);
  // }, [GoogleUserInfo]);

  useEffect(() => {
    const storedGoogleUserInfo = localStorage.getItem("GoogleUserInfo");
    if (storedGoogleUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedGoogleUserInfo);
        setGoogleUserInfo(parsedUserInfo);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user info:", error);
        localStorage.removeItem("GoogleUserInfo");
      }
    }
  }, []);

  const login = async (userData: GoogleUserInfo) => {
    if (!userData) {
      console.error("No user data provided");
      return;
    }

    try {
      const existingUser = await getUserData(userData.sub);

      if (!existingUser) {
        console.log("Creating new user");
        const newUser = await createNewUser(userData);
        console.log("New user created:", newUser);
      } else {
        console.log("Existing user found:", existingUser);
      }

      setIsLoggedIn(true);
      setGoogleUserInfo(userData);
      localStorage.setItem("GoogleUserInfo", JSON.stringify(userData));
    } catch (error) {
      console.error("Login process failed:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  const loginWithTest = async () => {
    setIsLoggedIn(true);
    const userData: any = await getUserData("123456");

    if (userData) {
      setGoogleUserInfo(userData);
      localStorage.setItem("GoogleUserInfo", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setGoogleUserInfo(null);
    googleLogout();
    localStorage.removeItem("GoogleUserInfo");
  };

  const values: GoogleAuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    GoogleUserInfo,
    setGoogleUserInfo,
    login,
    loginWithTest,
    logout,
  };

  return (
    <GoogleAuthContext.Provider value={values}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === null) {
    throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
  }
  return context;
};
