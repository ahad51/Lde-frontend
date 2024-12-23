import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PublicRoute from "../src/routes/PublicRouting"
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/Signup";
import Foget from "./Components/Forget/Forget";
import Reset from "./Components/Reset/reset";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute restricted>
              <Signup />
            </PublicRoute>
          }
        />
                <Route
          path="/forget"
          element={
            <PublicRoute restricted>
              <Foget />
            </PublicRoute>
          }
        />
                        <Route
        path="/reset-password/:uid/:token"
          element={
            <PublicRoute restricted>
              <Reset />
            </PublicRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;