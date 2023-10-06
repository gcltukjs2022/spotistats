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
      // sessionStorage.setItem("access_token", response?.data?.access_token);
      // sessionStorage.setItem(
      //   "access_token_expires_at",
      //   (Date.now() + response?.data.expires_in * 1000).toString(),
      // );
      // sessionStorage.setItem("refresh_token", response?.data?.refresh_token);
      // dispatch(setLogin(true));

      const accessToken = response?.data?.access_token;
      const expiresIn = response?.data?.expires_in;
      const refreshToken = response?.data?.refresh_token;

      if (accessToken && expiresIn && refreshToken) {
        // Calculate the expiration timestamp and store it
        const expirationTimestamp = Date.now() + expiresIn * 1000;
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem(
          "access_token_expires_at",
          expirationTimestamp.toString(),
        );
        sessionStorage.setItem("refresh_token", refreshToken);

        dispatch(setLogin(true));

        // Schedule a token refresh before it expires (e.g., a few minutes before)
        scheduleTokenRefresh(expiresIn - 300); // Refresh 5 minutes before expiration
      }

      navigate("/");
    } catch (error) {
      console.log("GET TOKEN ERROR: ", error);
    }
  };

  const scheduleTokenRefresh = (secondsBeforeExpiration: number) => {
    setTimeout(refreshAccessToken, secondsBeforeExpiration * 1000);
  };

  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");

    if (refreshToken) {
      try {
        // Perform the token refresh using the refresh token
        const params = new URLSearchParams();
        params.append("client_id", import.meta.env.VITE_CLIENT_ID);
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);

        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          params,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          },
        );

        const newAccessToken = response?.data?.access_token;
        const expiresIn = response?.data?.expires_in;

        if (newAccessToken && expiresIn) {
          // Calculate the new expiration timestamp and store it
          const expirationTimestamp = Date.now() + expiresIn * 1000;
          sessionStorage.setItem("access_token", newAccessToken);
          sessionStorage.setItem(
            "access_token_expires_at",
            expirationTimestamp.toString(),
          );

          // Schedule the next token refresh
          scheduleTokenRefresh(expiresIn - 300); // Refresh 5 minutes before expiration
        }
      } catch (error) {
        console.log("REFRESH TOKEN ERROR: ", error);
        // Handle token refresh error; the user may need to reauthenticate
      }
    }
  };

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
