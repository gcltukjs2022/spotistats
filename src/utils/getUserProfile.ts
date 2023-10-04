import axios from "axios";

export default async function getUserProfile() {
  try {
    let accessToken = sessionStorage.getItem("access_token");

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.log("GET USER PROFILE ERROR: ", error);
    return error;
  }
}
