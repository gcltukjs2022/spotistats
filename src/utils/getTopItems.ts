import axios from "axios";

export async function getTopTracks(token: string): Promise<any> {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data.items;
  } catch (err) {
    console.log(err);
    return err;
  }
}
