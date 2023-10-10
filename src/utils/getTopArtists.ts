import axios from "axios";

export async function getTopArtists(): Promise<any> {
  try {
    const token = sessionStorage.getItem("access_token");
    const res = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
    return err;
  }
}
