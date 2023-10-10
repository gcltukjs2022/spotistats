import { useEffect } from "react";
import "./App.css";

import getUserProfile from "./utils/getUserProfile";
import { useAppSelector } from "./redux/hooks";
import AppRouter from "./AppRouter";

function App() {
  const loginState = useAppSelector((state) => state.login);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  return <AppRouter />;
}

export default App;
