import { useEffect } from "react";
import "./App.css";
import AppRouter from "./appRouter";
import getUserProfile from "./utils/getUserProfile";

function App() {
  // useEffect(() => {
  //   (async () => {
  //     const profile = await getUserProfile();
  //   })();
  // }, []);

  return <AppRouter />;
}

export default App;
