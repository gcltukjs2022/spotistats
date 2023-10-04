import icons from "../assets/icons";

const Intro = () => {
  const items = [
    {
      img: icons.chart,
      title: "Your own charts",
      text: " View your most listened tracks, artists and genres and switch between 3 different time periods. Your data is updated approximately every day.",
    },
    {
      img: icons.arrows,
      title: "Compare to last visit",
      text: "View your most listened tracks, artists and genres and switch between 3 different time periods. Your data is updated approximately every day.",
    },
    {
      img: icons.save,
      title: "Create playlist",
      text: "View your most listened tracks, artists and genres and switch between 3 different time periods. Your data is updated approximately every day.",
    },
    {
      img: icons.replay,
      title: "Recently played tracks",
      text: "Check out your recently played tracks with timestamps",
    },
  ];
  return (
    <div className="p-3 pb-24 flex flex-col gap-y-6">
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className="flex gap-x-3 items-center"
          >
            <img
              src={item.img}
              alt=""
              className="w-12 h-12"
            />
            <div className="flex flex-col gap-y-3">
              <h2>{item.title}</h2>
              <p className="text-xs">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Intro;
