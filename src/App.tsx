import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import Login from "./pages/Login/Login";
import PostList from "./pages/PostsList/PostList";
function App() {
  const isLoggedIn = localStorage.getItem("user_token");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/posts" /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/posts"
          element={isLoggedIn ? undefined : <Navigate to="/login" />}
        >
          <Route path="" element={<PostList />} />
        </Route>

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
