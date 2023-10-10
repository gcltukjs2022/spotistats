import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../utils/auth";
import { getTopArtists } from "../utils/getTopArtists";

const TopArtists = () => {
  const loginState = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      getData();
    } else {
      navigate("/");
    }
  }, []);

  const getData = async () => {
    try {
      const res = await getTopArtists();

      if (res.status === 200) {
        setData(res.data.items);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        const refreshToken = sessionStorage.getItem("refresh_token");
        console.log(refreshToken);
        if (refreshToken) {
          const res = await refreshAccessToken(refreshToken);

          console.log(res);
        }
      }
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(data[0]);
  }, [data]);

  return (
    <div className="flex flex-col justify-center">
      <div className="m-3 p-3 ">
        <h1 className=" text-center text-3xl font-bold">Top Tracks</h1>
      </div>
      {data.length > 0 && (
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3">
            <div className="px-4 flex  bg-black text-white">
              <div className="w-full flex justify-between items-center gap-x-2">
                <h1 className="text-7xl font-bold">1</h1>
                <div className="flex flex-col gap-y-3">
                  <h3 className="text-md font-semibold">{data[0].name}</h3>
                </div>
                <img
                  src={data[0].images[1].url}
                  alt="album"
                  className="w-24 h-24"
                />
              </div>
            </div>
            <div className="flex font-bold w-full">
              <div className="px-2 border-r-2 flex flex-col gap-y-2 items-center justify-center w-1/2">
                <h3>GENRE</h3>
                <h3 className="text-sm text-center">
                  {data[0].genres[0].charAt(0).toUpperCase() +
                    data[0].genres[0].slice(1)}
                </h3>
              </div>
              <div className="px-2 flex flex-col gap-y-2 items-center justify-center w-1/2">
                <h3>POPULARITY</h3>
                <h3 className="text-sm">{data[0].popularity}</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {data.slice(1).map((el: any, i: number) => {
              return (
                <div
                  key={i}
                  className="pr-4 flex w-full"
                >
                  <div className="w-full flex  items-center gap-x-3 ">
                    <div className="flex items-center min-w-[187px] bg-black">
                      <img
                        src={el.images[1].url}
                        alt="album"
                        className="w-24 h-24"
                      />

                      <h1 className="flex justify-center items-center w-full text-4xl p-2 font-bold text-white">
                        {i + 2}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h3 className="text-sm font-extrabold text-left max-w-[160px]">
                        {el.name}
                      </h3>
                      <h3 className="text-xs font-semibold text-left">
                        {el.genres[0]
                          .split(" ")
                          .map(
                            (genre: string) =>
                              genre.charAt(0).toUpperCase() + genre.slice(1),
                          )
                          .join(" ")}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtists;
