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
      const profile = await getUserProfile();

      setDetails((prev) => ({
        ...prev,
        country: profile.country,
        name: profile.display_name,
        email: profile.email,
        urls: profile.external_urls,
        followers: profile.followers.total,
        images: profile.images.url,
        product: profile.product,
        type: profile.type,
      }));
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
