import axios from "axios";
import { refreshAccessToken } from "./auth";

export default async function getUserProfile(accessToken: string) {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return response;
  } catch (error: any) {
    console.log("GET USER PROFILE ERROR: ", error);

    // if (error.response.data.error.message === "The access token expired") {
    //   await refreshAccessToken();
    //   return error;
    // }
    return error;
  }
}
