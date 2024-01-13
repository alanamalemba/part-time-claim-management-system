import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
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
          role,
          password,
          account_number: accountNo,
          national_id: nationalId,
          job_id: job,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="flex justify-center items-center">
      <form className=" flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <label className="">
          <p>Enter name</p>
          <input
            className="border shadow p-1 rounded"
            placeholder="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <option value="claimant">Claimant</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label className="">
          <p>Enter password</p>
          <input
            className="border shadow p-1 rounded"
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
            className="border shadow p-1 rounded"
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
            className="border shadow p-1 rounded"
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
            <option value="1">Cleaner</option>
            <option value="2">Driver</option>
            <option value="3">Painter</option>
          </select>
        </label>

        <button className="bg-blue-500 p-1 rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
