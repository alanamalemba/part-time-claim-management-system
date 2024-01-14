import { Route, Routes } from "react-router-dom";
import NavBar from "./layout/navBar/NavBar";
import Header from "./layout/header/Header";
import CreateAccount from "./pages/CreateAccount";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SubmitClaim from "./pages/SubmitClaim";
import { UserType } from "./utilities/Types";

type UserContextType = {
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (localStorage.getItem("accessToken") && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className="relative ">
        <Toaster />
        {isLoading ? (
          <LoadingScreen />
        ) : isLoggedIn ? (
          <>
            <Header />
            <section className="flex ">
              <NavBar setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                <Route path="/" element={<CreateAccount />} />
                <Route path="/submit-claim" element={<SubmitClaim />} />
              </Routes>
            </section>
          </>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </main>
    </UserContext.Provider>
  );
}
