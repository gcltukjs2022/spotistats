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
  const [details, setDetails] = useState<any>();
  // const imgUrl = `https://flagsapi.com/${details?.country}/flat/64.png`;

  useEffect(() => {
    (async () => {
      let accessToken = sessionStorage.getItem("access_token");
      if (accessToken) {
        const res = await getUserProfile(accessToken);

        if (res.status === 200) {
          // setDetails((prev) => ({
          //   ...prev,
          //   country: res?.data?.country,
          //   name: res?.data?.display_name,
          //   email: res?.data?.email,
          //   urls: res?.data?.external_urls,
          //   followers: res?.data?.followers.total,
          //   images: res?.data?.images.url,
          //   product: res?.data?.product,
          //   type: res?.data?.type,
          // }));
          console.log(res);
          setDetails(res.data);
        } else {
          console.log("here");
          sessionStorage.clear();
        }
      }
    })();
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <div className="p-3 pb-8">
      {details && (
        <div className="flex flex-col justify-center items-center gap-y-4">
          <h1 className="text-xl font-semibold">
            Welcome Back {details?.display_name}!
          </h1>
          <div className="flex gap-x-6 items-center">
            <div className="">
              <img
                src={`https://flagsapi.com/${details?.country}/flat/64.png`}
                alt="flag"
                className="w-12 h-12 rounded-full overflow-hidden"
              />
            </div>
            <ul className="text-sm w-full">
              <li>
                Plan:{" "}
                {details?.product.charAt(0).toUpperCase() +
                  details?.product.slice(1)}
              </li>
              <li>Email: {details?.email}</li>

              <li>followers: {details?.followers.total}</li>
              <li>
                <a
                  href={details?.external_urls.spotify}
                  target="_blank"
                  className="underline"
                >
                  Your profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
