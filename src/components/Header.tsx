import chartDark from "../assets/icons/chartDark.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { refreshAccessToken } from "../utils/auth";
import { useAppDispatch } from "../redux/hooks";
import { setLogin } from "../redux/features/loginSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleRefresh = async () => {
    try {
      const res = await refreshAccessToken();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    dispatch(setLogin(false));
    setIsOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 w-full">
      <div className="relative p-3 md:m-6 xl:m-12 h-full bg-white flex justify-between items-center border-b-2">
        <nav className="">
          <div className="mx-auto flex justify-between items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
        <h1 className="font-bold">SpotiStats</h1>
        <div className="">
          <img
            src={chartDark}
            alt="logo"
            className="w-8"
            onClick={() => navigate("/")}
          />
        </div>
        <div
          className={`absolute z-99 top-full w-full min-h-screen pl-4 bg-white  transition-all duration-200 ease-in-out  ${
            isOpen ? "left-0" : "-left-[120%]"
          }`}
        >
          <ul
            className="border-b-2"
            // className={`absolute z-99 top-full w-full min-h-screen pl-4 bg-white  transition-all duration-200 ease-in-out  ${
            //   isOpen ? "left-0" : "-left-[120%]"
            // }`}
          >
            <li className="py-4">
              <a href="#">Top Tracks</a>
            </li>
            <li className="py-4">
              <a href="#">Top Albums</a>
            </li>
            <li className="py-4">
              <a href="#">Top Artists</a>
            </li>
            <li className="py-4">
              <a href="#">Account</a>
            </li>
            <li className="py-4">
              <a href="#">About</a>
            </li>
          </ul>
          <div className="flex pt-6 gap-6">
            <button
              className="bg-black  p-3 rounded-lg text-white text-xs"
              onClick={handleRefresh}
            >
              Refresh Token
            </button>
            <button
              className="bg-black  p-3 rounded-lg text-white text-xs"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
