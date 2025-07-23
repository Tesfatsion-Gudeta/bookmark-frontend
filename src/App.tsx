import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import PrivateRoute from "./routes/privateRoute";
import ProfilePage from "./pages/Profile";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmark />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* add dashboard and profile later */}
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
};

export default App;
