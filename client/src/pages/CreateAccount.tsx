import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [job, setJob] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
          account_number: accountNo,
          national_id: nationalId,
          job_id: job,
        }),
      });

      const data = await response.json();
      console.log(data);
      toast.success(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center pt-6 w-full">
      <form
        className=" flex flex-col gap-2 min-w-[400px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Create Account
        </h1>

        <label className="">
          <p>Enter name</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="name"
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
            placeholder="email"
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
            <option value="claimant">Claimant</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
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

        <label className="">
          <p>Enter account number</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="account number"
            type="number"
            required
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter National ID</p>
          <input
            className="border shadow p-1 rounded w-full"
            placeholder="national ID"
            type="number"
            required
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter Job</p>
          <select
            className=" border shadow w-full p-1"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          >
            <option disabled defaultValue="" value="">
              select a job
            </option>
            <option value="1">Cleaner</option>
            <option value="2">Driver</option>
            <option value="3">Painter</option>
          </select>
        </label>

        <button className="bg-blue-500 p-1 shadow-md rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
