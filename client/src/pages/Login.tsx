import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.success(data.error);
      } else {
        console.log(data);
        toast.success("Logged in successfully!");
        localStorage.setItem("accessToken", data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen  w-full">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Claim Portal</h1>
      <form
        className=" border shadow p-2 rounded  flex flex-col gap-2 min-w-[400px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Log In
        </h1>

        <label className="">
          <p>Enter email</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter password</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="bg-blue-500 p-1 shadow-md rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
