import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestUserAuthorization } from "../utils/auth";
import axios from "axios";
import { setLogin } from "../redux/features/loginSlice";
import { useAppSelector } from "../redux/hooks";

const Login = () => {
  const loginState = useAppSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const codeVerifier = sessionStorage.getItem("code_verifier");
    const token = sessionStorage.getItem("access_token");

    if (!token && code && codeVerifier) {
      getToken(code, codeVerifier);
    }
  }, [loginState]);

  const handleLogin = async () => {
    requestUserAuthorization();
  };

  const getToken = async (code: string, codeVerifier: string) => {
    try {
      console.log("here1");
      const params = new URLSearchParams();
      params.append("client_id", import.meta.env.VITE_CLIENT_ID);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URL);
      params.append("code_verifier", codeVerifier);

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );
      sessionStorage.setItem("access_token", response.data.access_token);

      dispatch(setLogin(true));

      navigate("/");
    } catch (error) {
      console.log("GET TOKEN ERROR: ", error);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     dispatch(setLogin(false));
  //   }, 3_600_000);
  // }, [accessTokenStorage, code]);

  return (
    <div className="p-3  bg-gray-100 pt-[100]">
      <div className="flex flex-col items-center max-w-90 w-full py-8 gap-6 bg-white">
        <h1 className="">Please login to see your spotify stats</h1>
        <button
          className="bg-primary text-white border-2 rounded-xl p-3"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
