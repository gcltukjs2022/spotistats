import axios from "axios";

export const getArtistData = async (token: string, id: string) => {
  const headers = {
    Authorization: "Bearer " + `${token}`,
  };
  const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers,
  });

  return res.data;
};
