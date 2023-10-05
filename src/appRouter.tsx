import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import UserProfile from "./components/userProfile";
// import Header from "./components/header";
// import { TopTracks } from "./components/topTracks";
// import Login from "./components/OldLogin";
// import Footer from "./components/footer";
// import Landing from "./pages/Landing";

const AppRouter = () => {
  return (
    <Router>
      <div className="max-w-full h-screen">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          {/* <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/callback"
            element={<Login />}
          />
          <Route
            path="/top-tracks"
            element={<TopTracks />}
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
