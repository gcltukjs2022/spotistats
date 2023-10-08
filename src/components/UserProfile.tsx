import { useEffect, useState } from "react";
import getUserProfile from "../utils/getUserProfile";

export interface Profile {
  country: string;
  name: string;
  email: string;
  urls: {
    [key: string]: string;
  };
  followers: number;
  images: string;
  product: string;
  type: string;
}

const UserProfile: React.FC = () => {
  const [details, setDetails] = useState<Profile>();
  const imgUrl = `https://flagsapi.com/${details?.country}/flat/64.png`;

  useEffect(() => {
    (async () => {
      let accessToken = sessionStorage.getItem("access_token");
      if (accessToken) {
        const res = await getUserProfile(accessToken);

        if (res.status === 200) {
          setDetails((prev) => ({
            ...prev,
            country: res?.data?.country,
            name: res?.data?.display_name,
            email: res?.data?.email,
            urls: res?.data?.external_urls,
            followers: res?.data?.followers.total,
            images: res?.data?.images.url,
            product: res?.data?.product,
            type: res?.data?.type,
          }));
        } else {
          console.log("here");
          sessionStorage.clear();
        }
      }
    })();
  }, []);

  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h1 className="text-md">Hello {details?.name}</h1>
        <img
          src={imgUrl}
          className="w-12 h-12"
        />
        <ul className="text-sm">
          <li>Email: {details?.email}</li>
          <li>Plan: {details?.product}</li>
          <li>
            Link:{" "}
            <a
              href={details?.urls.spotify}
              target="_blank"
            >
              {details?.urls.spotify}
            </a>
          </li>
          <li>followers: {details?.followers}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
