import { useAppSelector } from "../redux/hooks";
import Login from "../components/Login";
import Intro from "../components/Intro";
import { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
// import UserProfile from "../components/userProfile";
// import { TopTracks } from "../components/topTracks";

const Landing = () => {
  // const accessTokenStore = useAppSelector((state) => state.accessToken);
  const loginState = useAppSelector((state) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginState]);

  return (
    <div className="">
      <div>
        {isLoggedIn ? <UserProfile /> : <Login />}

        <Intro />
      </div>
    </div>
  );
};

export default Landing;
