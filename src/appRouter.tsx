import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./components/Nav";
import Footer from "./components/Footer";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";

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
          <Route
            path="/top-tracks"
            element={<TopTracks />}
          />
          <Route
            path="/top-artists"
            element={<TopArtists />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
