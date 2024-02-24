import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/Constants";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        console.log("hello");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchJobs();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (confirmPassword !== password) {
        toast.error("Passwords do not match!!");
        return;
      }

      const response = await fetch(`${serverUrl}/auth/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
          department,
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error.message);
        return;
      }
      console.log(data.success);
      toast.success(data.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center pt-6 w-full">
      <form
        className=" flex flex-col gap-2 min-w-[400px] max-w-[500px] w-full p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Create Account
        </h1>

        <label className="">
          <p>Enter full name</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="e.g. John Doe"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter email</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="e.g. johndoe@mail.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter role</p>
          <select
            className=" border shadow w-full p-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option disabled defaultValue="" value="">
              select a role
            </option>

            <option value="Admin">Admin</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Technician">Technician</option>
            <option value="Chairperson">Chairperson</option>
            <option value="Registrar">Registrar</option>
            <option value="Finance">Finance</option>
          </select>
        </label>

        {(role === "Chairperson" ||
          role === "Lecturer" ||
          role === "Technician") && (
          <label className="">
            <p>Enter Department</p>
            <select
              className=" border shadow w-full p-1"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option disabled defaultValue="" value="">
                select a department
              </option>

              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Education">Education</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Journalism">Journalism</option>
            </select>
          </label>
        )}

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

        <label className="">
          <p>Confirm password</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button className="bg-blue-500 p-1 text-white shadow-md rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
