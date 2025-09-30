import axios from "axios";
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Header1 from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import routes from "./routes";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const userRes = await axios.get(
          `${process.env.REACT_APP_base_url}/api/users`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (err) {
        console.error("Token verification failed:", err);
      }
    }
  };

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <Header1 logout={logout} />
      <Routes>
        {routes.map(({ path, element: Component, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected && !userData?.token ? (
                <Navigate to="/login" replace />
              ) : (
                <Component logout={logout} />
              )
            }
          />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
