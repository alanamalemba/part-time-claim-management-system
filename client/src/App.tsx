import { Route, Routes } from "react-router-dom";
import NavBar from "./layout/navBar/NavBar";
import Header from "./layout/header/Header";
import CreateAccount from "./pages/CreateAccount";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import { useEffect, useState } from "react";
import Login from "./pages/Login";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  return (
    <main className="relative ">
      <Toaster />
      {isLoading ? (
        <LoadingScreen />
      ) : isLoggedIn ? (
        <>
          <Header />
          <section className="flex ">
            <NavBar />
            <Routes>
              <Route path="/" element={<CreateAccount />} />
            </Routes>
          </section>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </main>
  );
}
