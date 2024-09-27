import "./App.css";
import "./styles/input.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./contexts/themeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleAuthProvider } from "./contexts/googleAuthContext";
import { AddNewTopicProvider } from "./contexts/addNewTopicContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <GoogleOAuthProvider clientId="1012169268791-qodkcbu8n1d9pa06cvoiqeqmqb50e5vs.apps.googleusercontent.com">
          <GoogleAuthProvider>
            <AddNewTopicProvider>
              <RouterProvider router={router} />
            </AddNewTopicProvider>
          </GoogleAuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
