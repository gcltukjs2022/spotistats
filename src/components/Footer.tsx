const Footer = () => {
  return (
    <div className="border-t-2">
      <div className="p-3 flex flex-col gap-3">
        <p className="text-base">© 2023 - SpotiStats</p>
        <p className="text-sm">
          This app is an independent personal project and is not associated with
          Spotify. It utilizes the Spotify Developer API for data retrieval. We
          cannot guarantee the accuracy or reliability of the information
          presented. Users assume all risks and responsibilities when using this
          app.
        </p>
      </div>
    </div>
  );
};

export default Footer;
