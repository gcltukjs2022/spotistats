import { useAppSelector } from "../redux/hooks";
import Login from "../components/Login";
import Intro from "../components/Intro";
import { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";

const Landing = () => {
  // const accessTokenStore = useAppSelector((state) => state.accessToken);
  const loginState = useAppSelector((state) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = sessionStorage.getItem("access_token");

  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [token]);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("access_token"));
  }, [loginState]);

  return (
    <div className="">
      <div>
        {isLoggedIn ? <UserProfile /> : <Login />}
        <div className="border-2">
          <ul className="py-6 flex justify-center items-center gap-x-6">
            <li className="w-[35%] p-3 rounded-full bg-black text-white text-center">
              <a href="/top-tracks">Top Albums</a>
            </li>
            <li className="w-[35%] p-3 rounded-full bg-black text-white text-center">
              <a href="/top-artists">Top Artists</a>
            </li>
          </ul>
        </div>
        <Intro />
      </div>
    </div>
  );
};

export default Landing;
